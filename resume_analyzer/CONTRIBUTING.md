# Contributing to Resume Analyzer

Thank you for your interest in contributing to the RMS Project! 🎉
We welcome contributions that improve functionality, fix bugs, add features, or enhance documentation.

---

## Project Overview

RMS is a desktop-based, offline Restaurant Management System built with Python.
It handles various modules like Orders, Billing, Inventory, Staff, and Reports.

---

## How to Contribute

1. #### Fork the Repository

   Click the **Fork** button at the top-right of this repo page.
2. #### Clone Your Fork


   ```
   git clone https://github.com/your-username/resuem-analyzer.git
   cd rms
   ```
3. #### Create a New Branch


   ```
   git checkout -b feature/your-feature-name
   ```
4. Make Your Changes

   ```
   git checkout -b feature/your-feature-name
   ```
5. #### Commit and Push


   ```
   git add .
   git commit -m "Add: [brief description of feature or fix]"
   git push origin feature/your-feature-name
   ```
6. #### Open a Pull Request


   * Go to the original repository on GitHub (the repository you forked from).
   * GitHub will usually show a prompt to create a pull request once you push changes to your fork.
   * Click the **Compare & pull request** button.
   * Provide a clear title and description for your pull request explaining the changes you made.
   * Make sure you're merging your changes into the **main** branch of the original repository.
   * Click  **Create pull request** .

---

## Contribution Ideas

* Fix bugs or UI glitches
* Add new pages or features (e.g., Reports, Discounts)
* Improve existing functionalities
* Add unit/integration tests
* Enhance documentation or localization
* Improve performance or code readability

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
└── run.py                  # App entry point for running fullstack or main server

```

---

## Contribution Guidelines

* Write clear, concise commit messages
* Follow the [PEP8](https://peps.python.org/pep-0008/) Python style guide
* Keep functions modular and reusable
* Add meaningful **docstrings** for all functions and classes
* Run all tests before submitting a PR

---

## Running Tests

```
pytest tests/
```

If you haven’t already, install testing dependencies:

```
pip install -r requirements.txt
```

---

## Code Style

Run lint checks using the provided script:

```
python scripts/lint.py your_file.py
```

---

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

We expect all contributors to act respectfully and professionally.

---

## Thank You!

We appreciate every contribution — big or small.

Let’s make **RMS** better together! 

**Happy coding!**
