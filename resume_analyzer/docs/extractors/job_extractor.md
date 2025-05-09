# JobExtractor Module Documentation

## Overview

The `JobExtractor` module is designed to parse and extract structured information from unstructured job descriptions. It leverages specialized extractor classes to handle key components such as required certifications, education, experience, skills, and languages. This module provides a unified interface for extracting job requirements in a structured format that can be easily used for further processing, analysis, or integration with other systems.

### Key Features:

- **Certifications Extraction**: Extracts any relevant certifications mentioned in the job description.
- **Education Extraction**: Identifies and extracts educational qualifications.
- **Experience Extraction**: Identifies the number of years of experience required and contextual experience phrases.
- **Skills Extraction**: Extracts both technical and soft skills mentioned in the job description.
- **Language Proficiency**: Identifies language proficiency expectations for the position.

The extraction is performed using keyword matching and pattern recognition techniques, which work across different natural formats in job descriptions.

## Classes

### `JobExtractor`

The `JobExtractor` class serves as the central interface that aggregates all specialized extractors. This class provides a simple method to extract all the key job requirements from a job description text.

#### Attributes:

- **`cert_extractor`**: Instance of `JobCertificationExtractor`, which extracts certifications from the text.
- **`edu_extractor`**: Instance of `JobEducationExtractor`, which extracts education-related requirements.
- **`exp_extractor`**: Instance of `JobExperienceExtractor`, which extracts experience-related requirements.
- **`lang_extractor`**: Instance of `JobLanguageExtractor`, which extracts language-related requirements.
- **`skill_extractor`**: Instance of `JobSkillExtractor`, which extracts technical and soft skills.

#### Methods:

##### `__init__(self)`

The constructor method initializes all the specialized extractors.

##### `parse(self, text: str) -> Dict[str, Any]`

Parses the provided job description text and returns a structured dictionary containing the extracted fields.

**Arguments**:

- `text` (`str`): The raw text of the job description.

**Returns**:

- `Dict[str, Any]`: A dictionary containing the following extracted fields:
  - **`Certifications`**: Extracted certifications.
  - **`Education`**: Extracted educational requirements.
  - **`Experience`**: Extracted experience phrases.
  - **`Skills`**: Extracted skills.
  - **`Languages`**: Extracted languages.

### Example:

```python
from job_extractor import JobExtractor

# Sample job description
jd_text = """
We're seeking a backend engineer with 3+ years of experience in Django and PostgreSQL.
Required: Bachelor's degree in Computer Science or related field.
Certifications like AWS Certified Solutions Architect or AZ-900 are a plus.
Must be fluent in English and familiar with Docker, Kubernetes, and React.
"""

# Initialize the JobExtractor
extractor = JobExtractor()

# Parse the job description
parsed = extractor.parse(jd_text)

# Print the extracted information
for key, value in parsed.items():
    print(f"{key}: {value}")
```
