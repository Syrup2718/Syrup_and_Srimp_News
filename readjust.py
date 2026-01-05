from generatenews import GenerateNews
import os
import json
import ollama


def rename(path):
    path = f".\\articles\\{path[15:23]}\\" 

    if not os.path.isdir(path):
        print(f"資料夾不存在: {path}")
        return

    files = [
        f for f in os.listdir(path)
        if f.endswith(".txt")
    ]

    files.sort(key=lambda f: os.path.getctime(os.path.join(path, f)))

    temp_names = []
    for i, old_name in enumerate(files):
        old_path = os.path.join(path, old_name)
        tmp_name = f"__tmp_article_{i}.txt"
        tmp_path = os.path.join(path, tmp_name)
        os.rename(old_path, tmp_path)
        temp_names.append(tmp_name)

    for i, tmp_name in enumerate(temp_names, start=1):
        tmp_path = os.path.join(path, tmp_name)
        new_name = f"article_{i}.txt"
        new_path = os.path.join(path, new_name)
        os.rename(tmp_path, new_path)

    print(f"已重新命名 {len(temp_names)} 個檔案於 {path}")


def export_json(path, bad_file):
    path = f".\\articles\\{path[15:23]}\\" 

    if not os.path.isdir(path):
        print(f"資料夾不存在: {path}")
        return

    files = [
        f for f in os.listdir(path)
        if f.startswith("article_") and f.endswith(".txt")
    ]
    
    for bad in bad_file:
        files.remove(bad["file"])
        
    files.sort(key=lambda name: int(name[len("article_"):-4]))
    
    data = [file for file in files]
    
    json_path = os.path.join(path, "index.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"已生成 JSON：{json_path}")


def detection(dir_path, model="qwen3-vl:4b", report_name="detection_report.jsonl"):
    dir_path = f".\\articles\\{dir_path[15:23]}\\"
    ollama.pull(model)

    results = []
    bad_files = []
    
    # 確保路徑存在
    if not os.path.isdir(dir_path):
        print(f"[ERROR] 找不到資料夾：{dir_path}")
        return []

    txt_files = [f for f in os.listdir(dir_path) if f.lower().endswith(".txt")]

    for fname in txt_files:
        full_path = os.path.join(dir_path, fname)
        with open(full_path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        rule_bad = GenerateNews._is_bad(text)
        llm_bad = False
        llm_reason = ""

        # 先做規則檢查
        if not rule_bad:
            prompt = f"""
你是一位嚴格的新聞審稿員，請檢查下面這篇新聞是否符合「正常新聞報導」的風格與格式。

請特別檢查：
1. 有沒有明顯的 AI 自我介紹 / 身份聲明（例如「作為AI…」、「身為語言模型…」）。
2. 有沒有太多評論、立場宣示或情緒性抒發，而不是描述事實。
3. 是否大致符合新聞文體：有主題、有時間、事件、人物、地點、基本脈絡。
4. 有沒有奇怪的列表、Markdown 語法或亂碼，看起來不像正常新聞。
5. 是否使用「繁體中文」來撰寫。
6. 第一行是否為標題且不超過20字。

請用**非常簡單的輸出格式**回答：
- 如果文章可以接受，請只輸出：OK
- 如果文章不合格，請只輸出一行：BAD: 簡短原因（不要超過 20 字）

下面是新聞全文：

{text}
"""
            try:
                resp = ollama.chat(
                    model=model,
                    messages=[
                        {"role": "system", "content": "你是一位嚴格的新聞審稿員，只關心文章品質。"},
                        {"role": "user", "content": prompt},
                    ],
                )
                reply = resp["message"]["content"].strip()
                # 只要不是以 "OK" 開頭，一律當成 BAD
                if not reply.upper().startswith("OK"):
                    llm_bad = True
                    llm_reason = reply[:50]  # 記錄前 50 字
            except Exception as e:
                llm_bad = True
                llm_reason = f"LLM_ERROR: {e}"

        # 彙整結果
        record = {
            "file": fname,
            "path": full_path,
            "rule_bad": bool(rule_bad),
            "llm_bad": bool(llm_bad),
            "llm_reason": llm_reason,
        }
        results.append(record)

        if rule_bad or llm_bad:
            bad_files.append(record)
            print(f"[BAD] {fname}  rule_bad={rule_bad}, llm_bad={llm_bad}")
        else:
            print(f"[OK ] {fname}")

    # 輸出成 jsonl 報告
    report_path = os.path.join(dir_path, report_name)
    with open(report_path, "w", encoding="utf-8") as f:
        for r in results:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"\n檢測完成，共 {len(txt_files)} 篇，問題文章 {len(bad_files)} 篇")
    print("詳細結果已寫入：", report_path)

    return bad_files