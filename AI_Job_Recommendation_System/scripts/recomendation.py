import os
import sys
# Add the project root to Python path
project_root = os.path.abspath(os.path.join(os.path.dirname('__file__'), '..', '..'))
if project_root not in sys.path:
    sys.path.append(project_root)

from scripts.data_cleaning import load_and_prepare_jobs, load_normalized_user_skills, clean_text
import pandas as pd
import numpy as np
from pydantic import BaseModel
import re
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import threading
import torch
import ast

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
                pass
                # Generate embeddings if file doesn't exist
                self.embeddings = self.model.encode(
                    self.job_df["text"].tolist(),
                    convert_to_numpy=True,
                    show_progress_bar=False,
                    device='cuda'
                )
                faiss.normalize_L2(self.embeddings)
                # Save embeddings if path is provided
                if self.embeddings_path:
                    np.save(self.embeddings_path, self.embeddings)

    def add_new_job(self, job_data: dict):
        """Add a new job and its embedding to the cache"""
        with self.lock:
            # Create new job entry
            new_job = pd.DataFrame([job_data])
            new_job["title_clean"] = new_job["Job_title"].apply(clean_text)
            new_job["desc_clean"] = new_job["Description"].apply(clean_text)
            new_job["text"] = new_job["title_clean"] + " " + new_job["desc_clean"]
            
            # Generate embedding for new job
            new_embedding = self.model.encode(
                new_job["text"].tolist(),
                convert_to_numpy=True,
                show_progress_bar=False,
                device='cuda'
            )
            
            # Append to existing data
            self.job_df = pd.concat([self.job_df, new_job], ignore_index=True)
            self.embeddings = np.vstack([self.embeddings, new_embedding])
            
            # Save updated embeddings if path is provided
            if self.embeddings_path:
                np.save(self.embeddings_path, self.embeddings)

    def query(self, user_emb: np.ndarray, user_loc: str):
        # Filter by location if provided
        if user_loc:
            mask = (self.job_df["Location"] == user_loc)
        else:
            mask = np.ones(len(self.job_df), dtype=bool)

        df_f = self.job_df[mask].reset_index(drop=True)
        emb_f = self.embeddings[mask]

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