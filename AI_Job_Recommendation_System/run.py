"""
Entry script to launch the AI Job Recommendation System (development mode).

This script runs the FastAPI app defined in `app/main.py` using Uvicorn with live reloading
enabled — perfect for rapid development and testing.

Features:
---------
- Launches FastAPI from `app.main:app`
- Enables `--reload` mode for automatic hot reloading
- Runs on localhost:8000 by default

Usage:
------
    python run.py

Dependencies:
-------------
- FastAPI
- Uvicorn (run `pip install uvicorn`)
"""

import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",        
        host="127.0.0.1",       
        port=8000,          
        reload=True,                 
    )
