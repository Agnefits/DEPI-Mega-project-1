"""
Command-line interface for managing the Restaurant Management System (RMS) project.

This script provides utilities for starting development servers, managing backend/frontend dependencies, 
building frontend assets, formatting code, and handling database table creation and deletion.

Available Commands:
    help               Show available commands and usage instructions
    runserver          Start the FastAPI backend development server
    runreact           Start the React frontend development server using Vite
    runapp             Start both backend and frontend servers in parallel
    installbackend     Install backend Python dependencies from requirements.txt
    installfrontend    Install frontend dependencies via npm install
    buildfrontend      Build the React frontend into static production files
    clean              Remove Python caches, test artifacts, and build directories
    format             Auto-format backend code using black and isort
    createtables       Create all database tables using SQLAlchemy AsyncEngine
    droptables         Drop all database tables using SQLAlchemy AsyncEngine

Requirements:
    - Python 3.10+
    - Node.js and npm installed and available in PATH
    - A `frontend/` directory containing a React app with a valid package.json
    - FastAPI backend entry point at `app/main.py`
    - Properly configured SQLAlchemy AsyncEngine in `app.db.database`
    - Uvicorn installed for serving FastAPI (`pip install uvicorn`)
    - Code formatters: `black`, `isort`, `autoflake`, `flake8`, `mypy`
"""

import asyncio
import multiprocessing
import os
import shutil
import subprocess
import sys
import uvicorn

# tables

from backend.models.job_description_model import JobDescription
from backend.models.resume_model import Resume
from backend.models.resume_match_model import ResumeMatchResult

sys.path.append(os.path.dirname(os.path.dirname(__file__)))




def run_fastapi():
    """
    Starts the FastAPI backend using Uvicorn with auto-reload.
    """
    print("Starting FastAPI server at http://127.0.0.1:8000 ...")
    try:
        uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
    except Exception as e:
        print(f"Error starting FastAPI server: {e}")


def run_react():
    """
    Starts the React frontend development server using `npm run dev`.

    Assumes the React app is located in the `frontend/` directory.

    Raises:
        FileNotFoundError: If `frontend/` directory or `npm` is not found.
    """
    frontend_path = os.path.join(os.getcwd(), "frontend")
    if not os.path.exists(frontend_path):
        print(f"Error: Frontend directory not found at {frontend_path}")
        return
    print(f"Starting React server from {frontend_path} ...")
    try:
        subprocess.run(["npm", "run", "dev"], cwd=frontend_path, shell=True)
    except FileNotFoundError:
        print("Error: npm not found. Make sure Node.js is installed and in your PATH.")


def run_app():
    """
    Starts both the FastAPI backend and React frontend development servers concurrently.

    Uses Python's multiprocessing to start both processes and waits for both to finish.
    Handles graceful shutdown on KeyboardInterrupt.
    """
    try:
        fastapi_process = multiprocessing.Process(target=run_fastapi)
        react_process = multiprocessing.Process(target=run_react)

        fastapi_process.start()
        react_process.start()

        fastapi_process.join()
        react_process.join()
    except KeyboardInterrupt:
        print("\nStopping servers gracefully...")
        fastapi_process.terminate()
        react_process.terminate()
        fastapi_process.join()
        react_process.join()
        sys.exit(0)
    except Exception as e:
        print(f"Error starting servers: {e}")
        fastapi_process.terminate()
        react_process.terminate()
        fastapi_process.join()
        react_process.join()
        sys.exit(1)


def install_backend():
    """
    Installs Python dependencies required for the FastAPI backend.

    Expects a `requirements.txt` file in the root directory.
    """
    print("Installing backend dependencies...")
    subprocess.run(["pip", "install", "-r", "requirements.txt"], check=True)


def install_frontend():
    """
    Installs Node.js dependencies for the React frontend using npm.

    Assumes the presence of a valid `package.json` inside `frontend/`.
    """
    frontend_path = os.path.join(os.getcwd(), "frontend")
    if not os.path.exists(frontend_path):
        print("Frontend directory not found.")
        return
    print("Installing frontend dependencies...")
    subprocess.run(["npm", "install"], cwd=frontend_path, shell=True, check=True)


def build_frontend():
    """
    Builds the React frontend for production using `npm run build`.

    Outputs static files into the `frontend/dist/` or `frontend/build/` directory.
    """
    frontend_path = os.path.join(os.getcwd(), "frontend")
    if not os.path.exists(frontend_path):
        print("Frontend directory not found.")
        return
    print("Building frontend for production...")
    subprocess.run(["npm", "run", "build"], cwd=frontend_path, shell=True, check=True)


def format_code():
    """
    Formats and analyzes the Python codebase using standard tools.

    Tools used:
        - black: Auto-formats code to PEP8 style
        - isort: Sorts and organizes imports
        - autoflake: Removes unused imports and variables
        - flake8: Reports linting issues and style violations
        - mypy: Runs optional static type checking

    Raises:
        RuntimeError if any tool is not found or fails unexpectedly.
    """
    print("Running code formatters and linters...\n")

    try:
        print(" Running isort...")
        subprocess.run(["isort", "."], check=True)

        print(" Running autoflake (removing unused imports/variables)...")
        subprocess.run(["autoflake", "--in-place", "--remove-unused-variables", "--remove-all-unused-imports", "-r", "."], check=True)

        print(" Running black (formatting code)...")
        subprocess.run(["black", "."], check=True)

        print(" Running flake8 (style and lint checks)...")
        subprocess.run(["flake8", "."], check=True)

        print(" Running mypy (static type checking)...")
        subprocess.run(["mypy", "."], check=True)

        print("\n Code formatting and linting completed successfully!")

    except subprocess.CalledProcessError as e:
        print(f"\n A formatting tool failed: {e}")
        print("Tip: Ensure all tools are installed or check the specific error.")
    except FileNotFoundError as e:
        print(f"\n Missing tool: {e}")
        print("Tip: Install all formatters with: pip install black isort autoflake flake8 mypy")


def create_tables():
    """
    Creates all database tables using SQLAlchemy's AsyncEngine and Base metadata.

    Imports:
        - engine from app.db.database
        - Base from app.db.models
    """
    from backend.database.create_tables import create_all_tables
    print("Creating all tables...")
    create_all_tables()
    asyncio.run(create_all_tables())
    print("All tables created.")


def drop_tables():
    """
    Drops all database tables using SQLAlchemy's AsyncEngine and Base metadata.

    Imports:
        - engine from app.db.database
        - Base from app.db.models
    """
    print("Dropping all tables...")
    from backend.database import engine
    from backend.models import Base

    async def run():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)

    asyncio.run(run())
    print("All tables dropped.")


def show_help():
    """
    Displays a list of available CLI commands and their descriptions.
    """
    print("""
Available commands:

    python manage.py help              Show this help message
    python manage.py runserver         Start FastAPI server
    python manage.py runreact          Start React frontend server
    python manage.py runapp            Start both servers
    python manage.py installbackend    Install backend dependencies
    python manage.py installfrontend   Install frontend dependencies
    python manage.py buildfrontend     Build React frontend
    python manage.py clean             Remove caches and build artifacts
    python manage.py format            Format code using black, isort, etc.
    python manage.py droptables        Drop all DB tables
    python manage.py createtables      Create all DB tables
""")


def main():
    """
    Entry point for CLI command dispatcher. Parses sys.argv[1] to determine the action.
    """
    if len(sys.argv) < 2:
        show_help()
        return

    command = sys.argv[1]

    match command:
        case "help":
            show_help()
        case "runserver":
            run_fastapi()
        case "runreact":
            run_react()
        case "runapp":
            run_app()
        case "installbackend":
            install_backend()
        case "installfrontend":
            install_frontend()
        case "buildfrontend":
            build_frontend()
        # case "clean":
        #     clean()
        case "format":
            format_code()
        case "droptables":
            drop_tables()
        case "createtables":
            create_tables()
        case _:
            print(f"Unknown command: {command}")
            show_help()


if __name__ == "__main__":
    main()
