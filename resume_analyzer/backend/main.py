from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.routes.resume_routes import router as resume_router
from backend.api.routes.job_routes import router as job_router
from backend.api.routes.match_routes import router as match_router

app = FastAPI(
    title="Resume Analyzer API",
    description="Extracts, stores, and matches resume data against job descriptions.",
    version="1.0.0"
)

# CORS (customize for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(resume_router)
app.include_router(job_router)
app.include_router(match_router)

# Create tables on startup

# Health check
@app.get("/", tags=["Health Check"])
def read_root():
    return {"message": "Resume Analyzer API is running "}
