"""
PDF 内容提取工具
================
使用方法：
  python extract_pdf.py your_file.pdf
  python extract_pdf.py your_file.pdf --output my_output_folder
  python extract_pdf.py ./papers/*.pdf   (批量处理)

输出结果（保存在 extracted_content/<文件名>/ 目录下）：
  text_content.md   -- 全文文字（Markdown 格式，按页分隔）
  tables.xlsx       -- 所有表格（每张表格一个工作表）
  images/           -- 所有内嵌图片
"""

import pdfplumber
import fitz  # PyMuPDF
import pandas as pd
import os
import sys
import glob
from pathlib import Path


def extract_pdf(pdf_path: str, output_dir: str | None = None) -> None:
    """
    提取 PDF 中的文字、表格、图片，并保存到 output_dir。
    """
    pdf_path = str(Path(pdf_path).resolve())
    if not os.path.exists(pdf_path):
        print(f"[错误] 文件不存在：{pdf_path}")
        return

    # 默认输出目录：extracted_content/<pdf文件名（不含扩展名）>
    if output_dir is None:
        base_name = Path(pdf_path).stem
        output_dir = str(Path("extracted_content") / base_name)

    # 创建输出目录
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    Path(f"{output_dir}/images").mkdir(exist_ok=True)

    print(f"\n{'='*55}")
    print(f"  正在处理：{Path(pdf_path).name}")
    print(f"  输出目录：{output_dir}")
    print(f"{'='*55}")

    # ────────────────────────────────────────────────────────
    # 1. 提取文字和表格（使用 pdfplumber）
    # ────────────────────────────────────────────────────────
    text_content = ""
    tables: list[dict] = []

    with pdfplumber.open(pdf_path) as pdf:
        total_pages = len(pdf.pages)
        for page_num, page in enumerate(pdf.pages, 1):
            print(f"  正在处理第 {page_num}/{total_pages} 页...")

            # -- 提取文字（保留段落格式）
            page_text = page.extract_text_simple()
            if page_text:
                text_content += f"\n\n--- 第 {page_num} 页 ---\n\n{page_text}"

            # -- 提取表格
            page_tables = page.extract_tables()
            for table_idx, table in enumerate(page_tables):
                if table:
                    df = pd.DataFrame(table)
                    tables.append({
                        "page": page_num,
                        "table_idx": table_idx + 1,
                        "data": df,
                    })

    # 保存文字内容（Markdown 格式）
    text_file = f"{output_dir}/text_content.md"
    with open(text_file, "w", encoding="utf-8") as f:
        f.write(f"# 学术论文内容提取\n")
        f.write(f"来源文件：{os.path.basename(pdf_path)}\n")
        f.write(text_content)
    print(f"\n  [OK] 文字内容保存至：{text_file}")

    # 保存表格到 Excel
    if tables:
        excel_file = f"{output_dir}/tables.xlsx"
        with pd.ExcelWriter(excel_file, engine="openpyxl") as writer:
            for t in tables:
                sheet_name = f"第{t['page']}页_表{t['table_idx']}"
                # Excel 工作表名称最长 31 字符
                sheet_name = sheet_name[:31]
                t["data"].to_excel(writer, sheet_name=sheet_name, index=False)
        print(f"  [TABLE] 表格（共 {len(tables)} 张）保存至：{excel_file}")
    else:
        print("  [INFO] 未检测到表格")

    # ────────────────────────────────────────────────────────
    # 2. 提取图片（使用 PyMuPDF / fitz）
    # ────────────────────────────────────────────────────────
    pdf_document = fitz.open(pdf_path)
    image_count = 0

    for page_num, page in enumerate(pdf_document, 1):
        images = page.get_images(full=True)
        for img_idx, img in enumerate(images):
            xref = img[0]
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]

            image_filename = f"page_{page_num}_img_{img_idx + 1}.{image_ext}"
            image_path = f"{output_dir}/images/{image_filename}"
            with open(image_path, "wb") as f:
                f.write(image_bytes)
            image_count += 1

    pdf_document.close()

    if image_count:
        print(f"  [IMG] 共提取 {image_count} 张图片，保存至：{output_dir}/images/")
    else:
        print("  [INFO] 未检测到内嵌图片")

    print(f"\n  [DONE] 提取完成！\n")


def main():
    # 解析命令行参数
    args = sys.argv[1:]

    if not args:
        print(__doc__)
        print("示例：python extract_pdf.py your_file.pdf")
        return

    output_dir = None

    # 检查是否指定了 --output
    if "--output" in args:
        idx = args.index("--output")
        if idx + 1 < len(args):
            output_dir = args[idx + 1]
            args = args[:idx] + args[idx + 2:]

    # 展开通配符（如 *.pdf）
    pdf_files: list[str] = []
    for pattern in args:
        matched = glob.glob(pattern)
        if matched:
            pdf_files.extend(matched)
        else:
            pdf_files.append(pattern)  # 直接当文件名处理，之后报错

    if not pdf_files:
        print("[错误] 没有找到匹配的 PDF 文件。")
        return

    # 批量处理
    for pdf_file in pdf_files:
        # 批量模式下每个文件用独立目录
        if len(pdf_files) > 1:
            per_file_dir = str(
                Path("extracted_content") / Path(pdf_file).stem
            )
            extract_pdf(pdf_file, per_file_dir)
        else:
            extract_pdf(pdf_file, output_dir)


if __name__ == "__main__":
    main()
