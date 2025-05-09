# ResumeTextExtractor Module Documentation

## Overview

The `ResumeTextExtractor` module provides functionality to extract and clean resume text from PDF and DOCX files. It leverages **PyMuPDF** (fitz) for PDF parsing and **python-docx** for DOCX parsing. The extracted text is cleaned by collapsing extra whitespace, standardizing bullet symbols, and normalizing common resume section headers (e.g., Skills, Experience, Education). This module provides a consistent format for downstream parsing or processing.

### Key Features:

- **PDF and DOCX Parsing**: Extracts resume text from PDF and DOCX files.
- **Text Cleaning**: Cleans and normalizes the extracted text for better processing (e.g., collapsing extra whitespace, standardizing bullets).
- **Section Header Normalization**: Converts section headers to a consistent format for better parsing (e.g., "Skills", "Experience", etc.).
- **Verbose Mode**: Optionally provides verbose output during the extraction process.

## Classes

### `ResumeTextExtractor`

This class is designed to extract and clean resume text from PDF or DOCX files. It supports layout-aware extraction for PDFs and paragraph-based extraction for DOCX files. After extraction, it cleans up the text by normalizing formatting and headers, making it easier to process downstream.

#### Attributes:

- **`file_path`** (`str`): Path to the resume file (PDF or DOCX).
- **`verbose`** (`bool`): Whether to log verbose output during processing.
- **`text`** (`str`): The extracted and cleaned resume text.

#### Methods:

##### `__init__(self, file_path: str, verbose: bool = False)`

Constructor to initialize the `ResumeTextExtractor` instance.

**Arguments**:

- `file_path` (`str`): Path to the resume file.
- `verbose` (`bool`, optional): Whether to print verbose output during the extraction. Default is `False`.

##### `extract_text(self) -> str`

Main method to extract and return cleaned text from the resume file.

**Returns**:

- `str`: Cleaned resume text.

**Raises**:

- `FileNotFoundError`: If the file does not exist.
- `ValueError`: If the file extension is unsupported (not PDF or DOCX).
- `RuntimeError`: If text extraction fails or file is empty.

##### `_extract_pdf(self) -> str`

Extracts and cleans text from a PDF resume using **PyMuPDF**.

**Returns**:

- `str`: Cleaned resume text extracted from PDF.

**Raises**:

- `RuntimeError`: If text extraction fails or the PDF is empty.

##### `_extract_docx(self) -> str`

Extracts and cleans text from a DOCX resume using **python-docx**.

**Returns**:

- `str`: Cleaned resume text extracted from DOCX.

**Raises**:

- `RuntimeError`: If text extraction fails or the DOCX document is empty.

##### `_clean_text(self, raw_text: str) -> str`

Cleans the raw extracted text by normalizing formatting and standardizing section headers.

**Arguments**:

- `raw_text` (`str`): The raw text extracted from the resume.

**Returns**:

- `str`: Cleaned and formatted text.

## Example Usage

```python
from resume_text_extractor import ResumeTextExtractor

# Sample file path (PDF or DOCX)
file_path = "path/to/resume.pdf"

# Initialize the extractor
extractor = ResumeTextExtractor(file_path, verbose=True)

# Extract cleaned text
cleaned_text = extractor.extract_text()

# Print the extracted and cleaned resume text
print(cleaned_text)
```
