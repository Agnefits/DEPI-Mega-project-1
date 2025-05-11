import os
import sys
# Add the project root to Python path
project_root = os.path.abspath(os.path.join(os.path.dirname('__file__'), '..', '..'))
if project_root not in sys.path:
    sys.path.append(project_root)

from scripts.data_cleaning import load_and_prepare_jobs, load_normalized_user_skills, clean_text
from app.services.embedding_utils import generate_job_embeddings
import pandas as pd
import numpy as np
from pydantic import BaseModel
import re
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import threading
import torch
import ast
from sklearn.preprocessing import normalize

class Job(BaseModel):
    job_id: int
    Job_title: str 
    Description: str
    Location: str
    score: float = 0.0

class JobCache:
    def __init__(self, job_path: str, model_name: str, top_k: int = 7, embeddings_path: str = None):
        self.job_path = job_path
        self.model = SentenceTransformer(model_name)
        self.lock = threading.Lock()
        self.embeddings_path = embeddings_path
        self.top_k = top_k
        self.reload_jobs()

    def reload_jobs(self):
        with self.lock:
            # Load and generate job_id
            df = load_and_prepare_jobs(self.job_path)
            # Clean and combine text fields
            df["title_clean"] = df["Job_title"].apply(clean_text)
            df["desc_clean"] = df["Description"].apply(clean_text)
            df["text"] = df["title_clean"] + " " + df["desc_clean"]
            self.job_df = df.reset_index(drop=True)
            
            # Try to load embeddings from file if path is provided
            if self.embeddings_path and os.path.exists(self.embeddings_path):
                self.embeddings = np.load(self.embeddings_path)
                print("embeddings loaded")
            else:
                # Generate embeddings if file doesn't exist
                self.embeddings = generate_job_embeddings(self.model, self.job_df["text"].tolist())
                # Save embeddings if path is provided
                if self.embeddings_path:
                    np.save(self.embeddings_path, self.embeddings)


    def query(self, user_emb: np.ndarray):

        df_f = self.job_df.reset_index(drop=True)
        emb_f = self.embeddings

        # Compute cosine similarities
        sims = cosine_similarity([user_emb], emb_f)[0]
        # Select top-K indices
        top_idx = np.argsort(sims)[-self.top_k:][::-1]

        results = []
        for i in top_idx:
            row = df_f.iloc[i]
            results.append(Job(
                job_id=int(row.job_id),
                Job_title=row.Job_title,
                Description=row.Description,
                Location=row.Location,
                score=float(sims[i]),
            ))
        return results