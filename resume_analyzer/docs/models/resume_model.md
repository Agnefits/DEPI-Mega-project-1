# Resume Model Documentation

## Overview

The `Resume` model represents a database table used to store both **raw resume text** and **structured parsed information**. This model is critical for applications such as:

- Resume parsers
- Applicant tracking systems (ATS)
- Job recommendation engines
- HR analytics platforms

---

## Table Name

```sql
resumes
```


## Schema

| Column Name               | Type         | Description                                                                |
| ------------------------- | ------------ | -------------------------------------------------------------------------- |
| `id`                    | `Integer`  | Primary key, auto-incremented                                              |
| `file_name`             | `String`   | Name of the uploaded resume file                                           |
| `raw_text`              | `Text`     | Full plain-text extracted from the resume                                  |
| `parsed_email`          | `String`   | Primary email extracted (if any)                                           |
| `parsed_phone`          | `String`   | Primary phone number extracted (if any)                                    |
| `parsed_links`          | `Text`     | JSON-encoded list of URLs (e.g., LinkedIn, GitHub)                         |
| `parsed_skills`         | `Text`     | JSON-encoded list of detected skills                                       |
| `parsed_experience`     | `Text`     | JSON-encoded structured work experience section                            |
| `parsed_education`      | `Text`     | JSON-encoded structured education section                                  |
| `parsed_certifications` | `Text`     | JSON-encoded list of certifications                                        |
| `parsed_languages`      | `Text`     | JSON-encoded list of spoken or written languages                           |
| `parsed_projects`       | `Text`     | JSON-encoded list of notable projects (academic or professional)           |
| `parsed_interests`      | `Text`     | JSON-encoded list of hobbies or interests                                  |
| `created_at`            | `DateTime` | Timestamp of when the record was created (defaults to `datetime.utcnow`) |


---

## Example JSON Stored in Fields

**parsed_skills** :

```json
["Python", "SQL", "Machine Learning", "FastAPI"]
```

**parsed_experience** :

```json
[
  {
    "title": "Software Engineer",
    "company": "TechCorp",
    "start_date": "2021-06",
    "end_date": "2023-04",
    "description": "Built REST APIs using FastAPI and deployed on AWS."
  }
]
```
