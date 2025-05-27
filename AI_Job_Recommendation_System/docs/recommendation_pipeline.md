# Recommendation Pipeline

This document details the end-to-end flow, data stores, algorithms, and error handling for generating job recommendations.

---

## 1. End-to-End Request Flow

```plaintext
Client           → FastAPI `/recommend`        → Recommendation Engine       → Response
----------------------------------------------------------------------------------------------
1. Send JSON:   |                         |                                 |
   {
     user_embedding: [...],
     job_ids: [...],
     job_embeddings: [[...],...],
     top_k: N
   }
2. Validate    | Pydantic model          |                                 |
3. Compute     | → cosine_similarity(...) → argsort → select top_k  
4. Return      | JSON [{job_id, score}, ...]    |
```

---

## 2. Data Stores & Schemas

### Vector Store
```json
{
  "job_id": int,
  "embedding": [float,...],
  "metadata": {
    "title": string,
    "company": string,
    "location": string,
    "timestamp": datetime
  }
}
```

### User Cache
```json
{
  "user_id": int,
  "embedding": [float,...],
  "preferences": {
    "location": string,
    "salary_range": object,
    "job_types": array
  },
  "last_updated": datetime
}

---

## 3. Recommendation Algorithm

### Similarity Computation
```python
def compute_similarity(user_emb, job_embs):
    # Ensure L2 normalization
    user_vec = normalize(user_emb.reshape(1, -1))
    job_vecs = normalize(job_embs)
    
    # Compute cosine similarity
    similarities = cosine_similarity(user_vec, job_vecs)[0]
    
    return similarities
```

### Ranking & Filtering
```python
def rank_jobs(similarities, job_ids, top_k=7):
    # Get top-k indices
    top_indices = np.argsort(similarities)[-top_k:][::-1]
    
    # Build recommendations
    recommendations = [
        {
            "job_id": int(job_ids[i]),
            "score": float(similarities[i])
        }
        for i in top_indices
    ]
    
    return recommendations
```

---

## 4. Error Handling & Fallback Logic

| Scenario                    | Behavior                                    |
| --------------------------- | ------------------------------------------- |
| Missing or Invalid Payload  | FastAPI returns 422 Unprocessable Entity    |
| Empty `job_embeddings` list | 204 No Content or `{ recommendations: [] }` |
| `top_k` > available jobs    | Return all jobs sorted by score             |
| Non-normalized embeddings   | Normalize on-the-fly before computing sims  |
| Internal Exception          | 500 Internal Server Error + `{error: msg}`  |

---


## 5. Monitoring & Logging

### Metrics
* Request latency
* Cache hit rates
* Error rates
* Resource usage

---

## 6. Security Measures

### Input Validation
* Schema validation
* Vector dimension checks
* Range validation
* Type checking

### Data Protection
* Input sanitization
* Output filtering
* Rate limiting

---

## 7. Scaling Strategy

### Horizontal Scaling
* Load balancing
* Service replication
* Database sharding
* Cache distribution

### Vertical Scaling
* Resource optimization
* Memory management
* CPU utilization
* GPU acceleration

---

## 8. Future Improvements

### Algorithm Enhancements
* Hybrid recommendation approach
* Context-aware ranking
* Personalization features
* Diversity optimization

### Infrastructure
* Microservices architecture
* Event-driven processing
* Real-time updates
* A/B testing framework

