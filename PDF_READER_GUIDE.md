# PDF 阅读工具使用指南

## 安装依赖（首次使用）

```bash
pip install pdfplumber pymupdf pandas openpyxl
```

## 基本用法

### 提取单个 PDF

```bash
python extract_pdf.py your_file.pdf
```

### 指定输出目录

```bash
python extract_pdf.py your_file.pdf --output my_folder
```

### 批量处理多个 PDF

```bash
python extract_pdf.py ./papers/*.pdf
```

## 输出结果

脚本运行后，会在 `extracted_content/<文件名>/` 目录下生成：

| 文件 | 内容 |
|------|------|
| `text_content.md` | 全文文字（按页分隔，Markdown 格式） |
| `tables.xlsx` | 所有表格（每张表格一个 Sheet） |
| `images/` | 所有内嵌图片（按页码和序号命名） |

## 常见问题

### Q: 表格提取错乱？
修改 `extract_pdf.py` 第 62 行，改用带参数的提取：
```python
page_tables = page.extract_tables(table_settings={
    "vertical_strategy": "lines",
    "horizontal_strategy": "lines",
    "intersection_x_tolerance": 2,
    "intersection_y_tolerance": 2,
})
```

### Q: 文字乱码？
在 `open()` 中改用 `encoding="gbk"` 保存中文文件：
```python
with open(text_file, "w", encoding="gbk") as f:
```

### Q: 图片提取失败（扫描版 PDF）？
扫描版 PDF 需要先 OCR。安装额外依赖：
```bash
pip install pytesseract pdf2image Pillow
```
然后参考 `ocr_scanned_pdf()` 函数（可按需添加到脚本中）。

## 在 Cursor 中运行

1. 右键点击 `extract_pdf.py`
2. 选择 **"Run Python File in Terminal"**
3. 或在终端中直接输入命令
