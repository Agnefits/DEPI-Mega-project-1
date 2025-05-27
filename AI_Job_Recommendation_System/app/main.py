"""
main.py

Entry point for the AI Job Recommendation System API.

Initializes the FastAPI application and registers embedding and recommendation routes.

Routes:
-------
- POST `/ingest/job`: Generate and return job embedding.
- POST `/ingest/user`: Generate and return user embedding.
- POST `/recommend`: Accepts user embedding and job embeddings, returns top_k recommendations.
- GET `/health`: Health check endpoint.

Example:
--------
$ uvicorn main:app --reload

Dependencies:
-------------
- FastAPI
- sentence-transformers
- scikit-learn
- numpy
"""

# ===== main.py =====
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import numpy as np
from app.services.embedding_utils import (
    initialize_embedding_model,
    generate_job_embeddings,
    generate_user_embedding,
    clean_text
)
from app.services.recommendation_engine import recommend_jobs


import logging
import sys

# Configure logging to output to stdout
logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logger = logging.getLogger(__name__)

# Log a startup message
logger.info("Starting the application")

app = FastAPI()
embed_model = initialize_embedding_model(device='cpu')

class JobIn(BaseModel):
    job_id: int
    description: str

class UserIn(BaseModel):
    user_id: int
    skills: List[str]

class RecommendRequest(BaseModel):
    user_id: int
    user_embedding: List[float]
    job_ids: List[int]
    job_embeddings: List[List[float]]
    top_k: int = 100

@app.post('/ingest/job')
def ingest_job(job: JobIn):
    """
    Receive a single job JSON, generate its embedding, and return it.
    Backend persistence is handled by the caller.
    """
    text = job.description
    text = clean_text(text)
    emb = generate_job_embeddings(embed_model, [text])[0]
    return {
        'status': 'job embedding generated',
        'job_id': job.job_id,
        'embedding': emb.tolist()
    }

@app.post('/ingest/user')
def ingest_user(user: UserIn):
    """
    Receive a single user JSON, generate its embedding, and return it.
    Backend persistence is handled by the caller.
    """
    emb = generate_user_embedding(embed_model, user.skills)
    return {
        'status': 'user embedding generated',
        'user_id': user.user_id,
        'embedding': emb.tolist()
    }

@app.post('/recommend')
def recommend(req: RecommendRequest):
    """
    Receive precomputed user embedding and a list of job IDs + job embeddings,
    compute similarity, and return top_k recommendations.
    """
    user_emb = np.array(req.user_embedding, dtype='float32')
    job_embs = np.array(req.job_embeddings, dtype='float32')
    recs = recommend_jobs(user_emb, req.job_ids, job_embs, top_k=req.top_k)
    return {'recommendations': recs}

@app.get('/')
def health():
    return {'status': 'ok'}
