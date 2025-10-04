import os
import sys
import json
import requests
import numpy as np

# ==== 基本設定 ====
FOLDER = "news"  # 你的 .txt 放這
OLLAMA = "http://localhost:11434"
EMBED_MODEL = "nomic-embed-text"

# ---- 產生向量：標題+前導 + 斷塊平均（更穩定） ----
def _embed(text: str):
    r = requests.post(f"{OLLAMA}/api/embeddings",
                      json={"model": EMBED_MODEL, "prompt": text})
    r.raise_for_status()
    v = np.array(r.json()["embedding"], dtype="float32")
    v /= (np.linalg.norm(v) + 1e-12)  # 單位化 → 內積=cosine
    return v

def _chunks(s: str, n=1200, overlap=120):
    s = (s or "").strip()
    if not s: return []
    out, i, L = [], 0, len(s)
    while i < L:
        j = min(i + n, L)
        out.append(s[i:j])
        if j == L: break
        i = max(0, j - overlap)
    return out

def news_vector_from_text(raw_text: str):
    # 抓第一行當「標題」，其餘當「內文」
    lines = raw_text.splitlines()
    title = (lines[0] if lines else "").strip()
    body  = ("\n".join(lines[1:])).strip()
    
    # 1) 標題 + 前導
    v_titlelead = _embed((title + "\n\n" + body[:800]).strip() or title)

    # 2) 內文斷塊 + 平均'
    chunks = _chunks(body, n=1200, overlap=120) or [body or title]
    vs = np.stack([_embed(c) for c in chunks])
    v_body = vs.mean(axis=0)
    v_body /= (np.linalg.norm(v_body) + 1e-12)

    # 3) 融合（可調權重）
    v = 0.6 * v_titlelead + 0.4 * v_body
    v /= (np.linalg.norm(v) + 1e-12)
    return v

# ---- 分群：優先 HDBSCAN，失敗則 DBSCAN（餘弦距離） ----
def cluster_vectors(vectors, files):
    N = len(vectors)
    # cosine distance = 1 - cosine similarity
    sim = vectors @ vectors.T
    np.fill_diagonal(sim, 1.0)
    dist = 1.0 - sim

    labels = None
    algo = None
    extra = {}

    try:
        import hdbscan
        # 參數可調：min_cluster_size=2 (至少兩篇成群)
        c = hdbscan.HDBSCAN(min_cluster_size=2, metric='precomputed')
        labels = c.fit_predict(dist)
        algo = "HDBSCAN"
        extra["cluster_probabilities"] = getattr(c, "probabilities_", None)
    except Exception as e:
        # 備援：DBSCAN（用距離矩陣），eps 可依資料調整
        from sklearn.cluster import DBSCAN
        # 粗略設定：取距離矩陣的 40% 分位當 eps 初值
        tri = dist[np.triu_indices(N, k=1)]
        eps = 0.3 # float(np.quantile(tri, 0.40)) if tri.size else 0.5
        db = DBSCAN(metric='precomputed', eps=eps, min_samples=2)
        labels = db.fit_predict(dist)
        algo = f"DBSCAN(eps≈{eps:.2f})"

    # 輸出結果
    clusters = {}
    for f, lb in zip(files, labels):
        clusters.setdefault(int(lb), []).append(f)

    return algo, clusters, sim

def main():
    # 讀檔
    files, texts = [], []
    for fn in sorted(os.listdir(FOLDER)):
        if fn.lower().endswith(".txt"):
            p = os.path.join(FOLDER, fn)
            with open(p, "r", encoding="utf-8") as fh:
                texts.append(fh.read())
            files.append(fn)
    if not files:
        print(f"[!] {FOLDER} 內沒有 .txt 檔")
        sys.exit(1)

    # 轉向量
    vecs = np.vstack([news_vector_from_text(t) for t in texts])

    # 分群
    algo, clusters, sim = cluster_vectors(vecs, files)

    # 顯示
    print(f"\n=== 使用演算法：{algo} ===")
    for lb, group in sorted(clusters.items(), key=lambda x: x[0]):
        tag = "噪音/未分群" if lb == -1 else f"群 {lb}"
        print(f"{tag}: {group}")

    # 額外：印簡易相似度矩陣（四捨五入到 2 位）
    print("\n=== 相似度矩陣（cosine） ===")
    header = "          " + "  ".join(f"{f:>12}" for f in files)
    print(header)
    for i, f in enumerate(files):
        row = "  ".join(f"{sim[i,j]:.2f}" for j in range(len(files)))
        print(f"{f:>10}  {row}")

if __name__ == "__main__":
    main()
