# JobDescription Model Documentation

## Overview

The `JobDescription` model represents job listings that have been parsed into both unstructured and structured fields. It is essential for:

- Resume-to-job matching engines
- Automated job parsing systems
- HR tech platforms (e.g., talent acquisition tools, job boards)
- AI-powered candidate fit scoring systems

---

## Table Name

```sql
job_descriptions
```


## Schema

| Column Name                 | Type         | Description                                                              |
| --------------------------- | ------------ | ------------------------------------------------------------------------ |
| `id`                      | `Integer`  | Primary key, auto-incremented identifier                                 |
| `title`                   | `String`   | Job title (e.g., Backend Engineer, Data Scientist)                       |
| `company`                 | `String`   | Name of the hiring company (nullable)                                    |
| `raw_text`                | `Text`     | Full raw job description as provided in the posting                      |
| `required_skills`         | `Text`     | JSON-encoded list of required skills (nullable)                          |
| `required_experience`     | `Text`     | JSON-encoded list of years or phrases describing experience (nullable)   |
| `required_certifications` | `Text`     | JSON-encoded list of required certifications (nullable)                  |
| `required_languages`      | `Text`     | JSON-encoded list of required languages (spoken/written) (nullable)      |
| `required_education`      | `Text`     | JSON-encoded degree/field of study requirements (nullable)               |
| `created_at`              | `DateTime` | Timestamp indicating when this record was created (defaults to UTC time) |

---

**required_skills** :

```json
["Python", "REST APIs", "Docker", "PostgreSQL"]
```

**required_experience** :

```json
["3+ years in backend development", "2 years with cloud platforms"]
```

**required_certifications** :

```json
["AWS Certified Developer", "Certified Kubernetes Administrator (CKA)"]
```

**required_languages** :

```json
["English (Fluent)", "French (Basic)"]
```

**required_education** :

```json
["Bachelor's in Computer Science", "Master's in Data Science"]
```
