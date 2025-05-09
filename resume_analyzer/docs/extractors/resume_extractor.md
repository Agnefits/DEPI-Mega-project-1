# ResumeExtractor Module Documentation

## Overview

The `ResumeExtractor` module is a unified interface for parsing and structuring key information from unstructured resume or CV text. It leverages modular NLP-based components to extract essential details, such as:

- **Contact Information**: Emails, phone numbers, web links (e.g., LinkedIn, GitHub)
- **Skills**: Both technical and soft skills
- **Experience**: Work experience and job responsibilities
- **Projects**: Personal and academic projects
- **Certifications**: Standard and custom certifications
- **Languages**: Spoken languages and proficiency levels
- **Interests**: Hobbies and personal interests

This module allows you to extract structured data from resumes to use for automated HR processes, talent analytics, or recruitment tools.

## Features

- **Contact Extraction**: Extracts emails, phone numbers, and relevant links.
- **Skills Detection**: Identifies technical and soft skills from job roles and projects.
- **Experience Parsing**: Extracts work experience details and job responsibilities.
- **Project Extraction**: Parses personal and academic project descriptions.
- **Certifications Recognition**: Extracts certifications relevant to the profession.
- **Language Identification**: Identifies languages and proficiency.
- **Interest Parsing**: Identifies personal hobbies and interests.

Each component uses pattern matching, keyword recognition, and heuristics to handle various resume formats.

## Classes

### `ResumeExtractor`

The main class for extracting structured information from a resume. It aggregates multiple specialized extractors for contact info, skills, projects, certifications, and more.

#### Attributes:

- **`skill_extractor`**: An instance of `SkillExtractor` to identify skills from the resume.
- **`email_extractor`**: An instance of `EmailExtractor` to extract email addresses.
- **`phone_extractor`**: An instance of `PhoneExtractor` to extract phone numbers.
- **`link_extractor`**: An instance of `LinkExtractor` to extract links such as LinkedIn, GitHub, etc.
- **`project_extractor`**: An instance of `ProjectExtractor` to extract project details.
- **`experience_extractor`**: An instance of `ExperienceExtractor` to extract work experience.
- **`certification_extractor`**: An instance of `CertificationExtractor` to extract certifications.
- **`interest_extractor`**: An instance of `InterestExtractor` to extract personal interests.
- **`language_extractor`**: An instance of `LanguageExtractor` to extract languages spoken.

#### Methods:

##### `__init__(self)`

The constructor method initializes all the specialized extractors.

##### `parse(self, text: str, classify_links: bool = True) -> Dict[str, Optional[Any]]`

Parses the given resume text and returns a structured dictionary containing the extracted fields.

**Arguments**:

- `text` (`str`): Raw resume text.
- `classify_links` (`bool`): Whether to classify links by category (e.g., LinkedIn, GitHub). Default is `True`.

**Returns**:

- `Dict[str, Optional[Any]]`: A dictionary containing the following extracted components:
  - **`Email`**: Extracted email address or `None`.
  - **`Phone`**: Extracted phone number or `None`.
  - **`Links`**: Extracted links (LinkedIn, GitHub, etc.), classified by type.
  - **`Skills`**: List of skills found in the resume.
  - **`Projects`**: List of projects found, including titles and descriptions.
  - **`Experience`**: List of work experience entries.
  - **`Certifications`**: List of certifications extracted from the resume.
  - **`Languages`**: List of spoken languages.
  - **`Interests`**: List of personal interests or hobbies.

## Example Usage

```python
from resume_extractor import ResumeExtractor

# Sample resume text
sample_resume = """
John Doe
Email: john.doe@example.com
Phone: +1 (555) 123-4567
LinkedIn: linkedin.com/in/johndoe
GitHub: github.com/johndoe

Skills:
Python, JavaScript, React, FastAPI, Docker, SQL, Machine Learning

Projects:
Resume Parser
Built an NLP-based resume parser using Python, spaCy, and regex to extract structured fields.

Portfolio Website
Developed a personal portfolio using React and deployed it on Netlify.

Experience:
Software Engineer – OpenAI
2021 – Present
- Built RESTful APIs using FastAPI and deployed models on AWS
- Collaborated on NLP models for document understanding

Certifications:
AWS Certified Solutions Architect – Associate
TensorFlow Developer Certificate
Completed Coursera Deep Learning Specialization

Languages:
English, French, Arabic

Interests:
- Hiking • Blogging • AI Ethics • Photography
"""

# Initialize the ResumeExtractor
extractor = ResumeExtractor()

# Parse the resume
parsed = extractor.parse(sample_resume)

# Print extracted information
for key, value in parsed.items():
    print(f"{key}: {value}")
```
