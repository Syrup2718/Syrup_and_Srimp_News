import os
import json

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


def export_json(path):
    path = f".\\articles\\{path[15:23]}\\" 

    if not os.path.isdir(path):
        print(f"資料夾不存在: {path}")
        return

    files = [
        f for f in os.listdir(path)
        if f.startswith("article_") and f.endswith(".txt")
    ]
    
    files.sort(key=lambda name: int(name[len("article_"):-4]))
    
    count = len(files)
    data = [f"article_{i}.txt" for i in range(1, count + 1)]
    
    json_path = os.path.join(path, "index.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"已生成 JSON：{json_path}")
