# Resume Analyzer

**Resume Analyzer** is a full-stack, AI-powered platform for parsing, analyzing, and matching resumes to job descriptions using advanced NLP and machine learning models. It's designed to assist recruiters, job portals, and ATS platforms in finding the most relevant candidates quickly.

---

## Features

- **Resume Parsing** — Extracts structured data from unstructured PDF/DOCX resumes
- **Job Description Parsing** — Extracts required skills, experience, and qualifications
- **AI-Powered Matching** — Scores how well a resume matches a job description
- **Skill Gap Insights** — Shows matched and missing skills with explanations
- **ML/NLP Pipeline** — Trained models for language processing and vector similarity
- **Secure & Extensible** — Built on FastAPI with async SQLAlchemy and modern architecture

---

## Project Structure

```
resume-analyzer/
├── backend/                # FastAPI backend: routes, models, services, database
├── ai/                     # AI/ML models, training, inference, and scoring logic
├── docs/                   # Project documentation, architecture diagrams, and API docs
├── frontend/               # Web UI code (React, Flet, Gradio, or HTML/CSS)
├── scripts/                # Automation scripts: DB seeding, backups, setup tasks
├── tests/                  # Unit and integration tests for backend and AI components
├── .env                    # Environment variables (DB credentials, API keys, etc.)
├── CHANGELOG.md            # Tracks feature additions, changes, and bug fixes
├── LICENSE                 # Project license (e.g., Apache 2.0, MIT)
├── manage.py               # CLI manager for running app, DB setup, tests, etc.
├── requirements.txt        # Python dependencies list for pip installation
├── README.md               # Project overview, installation, and usage instructions
└── run.py  
```


---



## AI Models Used

| Feature             | Model / Technique                                          |
| ------------------- | ---------------------------------------------------------- |
| Resume Text Parsing | Regular Expressions (Regex)                                |
| Resume Embeddings   | Sentence-BERT (SBERT)                                      |
| Matching Algorithm  | Cosine Similarity                                          |
| Skill Extraction    | Rule-based NLP (optional expansion with spaCy or patterns) |


---



## Contributing

We welcome contributions! Fork the repo and create a pull request, or open an issue if you'd like to discuss a feature or bug.

---


## License

Licensed under the [Apache 2.0 License](LICENSE).

---



## Acknowledgments

* [FastAPI]()
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [nltk]()
* [Typer]()
* [OpenAI Embeddings / SBERT](https://www.sbert.net/)
