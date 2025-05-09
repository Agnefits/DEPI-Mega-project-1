"""
recommendation_engine.py

Core Job Recommendation Engine for AI-Powered Matching System

This module contains the core logic for ranking job listings based on cosine similarity
between a user embedding and a set of job embeddings.

Key Function:
--------------
- `recommend_jobs(user_emb: np.ndarray, job_ids: List[int], job_embs: np.ndarray, top_k: int) -> List[Dict[str, Any]]`:
    Compute cosine similarities and return the top_k job IDs with their scores.

Usage:
------
>>> recs = recommend_jobs(user_emb, job_ids, job_embs, top_k=7)

Dependencies:
-------------
- numpy
- scikit-learn (cosine_similarity)
"""


import numpy as np
from typing import List, Dict, Any
from sklearn.metrics.pairwise import cosine_similarity


def recommend_jobs(
    user_emb: np.ndarray,
    job_ids: List[int],
    job_embs: np.ndarray,
    top_k: int = 100
) -> List[Dict[str, Any]]:
    """
    Compute cosine similarity between a single user embedding and a set of job embeddings,
    and return the top_k job IDs with similarity scores.
    """
    sims = cosine_similarity(user_emb.reshape(1, -1), job_embs)[0]
    top_idx = np.argsort(sims)[-top_k:][::-1]
    return [
        {"job_id": int(job_ids[i]), "score": float(sims[i])}
        for i in top_idx
    ]
