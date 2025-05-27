"""
embedding_utils.py

📌 Embedding Utility Module for Job Recommendation System

This module provides utility functions to convert user profiles and job descriptions
into dense vector representations using SBERT (Sentence-BERT).

Key Functions:
--------------
- `clean_text(text: str) -> str`: Clean input text by removing URLs, emails, and phone numbers.
- `initialize_embedding_model(model_name: str, device: str) -> SentenceTransformer`: Load SBERT model.
- `generate_job_embeddings(model, texts: List[str]) -> np.ndarray`: Embed and L2-normalize job descriptions.
- `generate_user_embedding(model, skills: List[str]) -> np.ndarray`: Embed and L2-normalize a single user's skill list.

Dependencies:
-------------
- sentence-transformers
- scikit-learn
- numpy
"""
# ===== embedding.py =====
import re
from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List
from sklearn.preprocessing import normalize


def clean_text(text: str) -> str:
    # Remove web links
    text = re.sub(r"http\S+|www\.\S+", " ", text)
    # Remove email addresses
    text = re.sub(r"\S+@\S+", " ", text)
    # Remove phone numbers (digits, dashes/spaces, length ≥9)
    text = re.sub(r"\+?\d[\d\-\s]{7,}\d", " ", text)
    # Collapse all consecutive whitespace into single spaces
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def initialize_embedding_model(
    model_name: str = 'all-MiniLM-L6-v2', device: str = 'cpu'
) -> SentenceTransformer:
    """
    Load and return a pretrained SentenceTransformer model.
    """
    return SentenceTransformer(model_name, device=device)


def generate_job_embeddings(
    model: SentenceTransformer,
    texts: List[str]
) -> np.ndarray:
    """
    Generate embeddings for job descriptions and L2-normalize them.
    """
    embs = model.encode(texts, convert_to_numpy=True, show_progress_bar=False)
    return normalize(embs, norm='l2', axis=1)



def generate_user_embedding(
    model: SentenceTransformer,
    skills: List[str]
) -> np.ndarray:
    """
    Generate an embedding for a single user's skill list (mean pooled) and L2-normalize.
    """
    if skills:
        embs = model.encode(skills, convert_to_numpy=True)
        vec = embs.mean(axis=0)
    else:
        dim = model.get_sentence_embedding_dimension()
        vec = np.zeros(dim, dtype='float32')
    vec = vec.reshape(1, -1)
    return normalize(vec, norm='l2', axis=1)[0]