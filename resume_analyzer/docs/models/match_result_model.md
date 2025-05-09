# 📄 ResumeMatchResult Model Documentation

## Overview

The `ResumeMatchResult` model stores the results of comparing a **resume** to a **job description**. This model is essential in:

- Applicant Tracking Systems (ATS)
- Job-resume matching engines
- AI-based recruitment tools
- Candidate ranking dashboards

It helps quantify how well a candidate's resume aligns with a given job posting using a **match score**, along with detailed breakdowns like matched and missing skills.

---

## Table Name

```sql
resume_match_results
```


## Schema

| Column Name            | Type         | Description                                            |
| ---------------------- | ------------ | ------------------------------------------------------ |
| `id`                 | `Integer`  | Primary key, auto-incremented                          |
| `resume_id`          | `Integer`  | Foreign key referencing `resumes.id`                 |
| `job_description_id` | `Integer`  | Foreign key referencing `job_descriptions.id`        |
| `match_score`        | `Float`    | Final matching score (e.g., from 0.0 to 100.0)         |
| `matched_skills`     | `Text`     | JSON stringified list of overlapping/matched skills    |
| `missing_skills`     | `Text`     | JSON stringified list of required but missing skills   |
| `notes`              | `Text`     | Optional explanation or contextual notes for the score |
| `created_at`         | `DateTime` | Timestamp when this match result was generated         |


---



## Relationships

* `resume_id` → `resumes.id`
* `job_description_id` → `job_descriptions.id`

These relationships allow linking match results directly to both the candidate and the job they were evaluated for.

---

## Example Data

**matched_skills** :

```json
["Python", "SQL", "FastAPI", "Docker"]
```

**missing_skills** :

```json
["Kubernetes", "Redis", "AWS"]
```
