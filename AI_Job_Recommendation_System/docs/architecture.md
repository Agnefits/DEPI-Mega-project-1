# AI Component Architecture for Content-Based Job Recommendation

## 1. Overview

The Content-Based Job Recommendation Service is designed to deliver personalized, real-time job suggestions by matching user profile embeddings against a precomputed vector index of job embeddings. It returns the **top 7** most relevant jobs within **3 seconds** end-to-end, relying solely on semantic similarity (no collaborative filtering). This microservice uses lightweight, pre-trained transformer models for embedding and a fast nearest-neighbor search to ensure sub-second inference under typical loads.

## 2. Component Diagram

```plaintext
+-----------------------+        +----------------------+        +-----------------------+
|  FastAPI Inference    |------->|  Embedding Utils     |------->|  Recommendation       |
|  Endpoint (/recommend)|        |  (SBERT/MiniLM/E5)   |        |  Engine (NN Search)   |
+-----------------------+        +----------------------+        +-----------+-----------+
                                                                          |
                                                                          |
                                                                    +-----v-----+
                                                                    | Vector     |
                                                                    | Index for  |
                                                                    | Job Embs   |
                                                                    +-----------+
                                                                           |
                                                                           |
                                                                    +------v------+
                                                                    | Redis Cache |<------+
                                                                    | (User Profs)|       |
                                                                    +-------------+       |
                                                                                           |
                                                                                           |
                                                                                   +-------v-------+
                                                                                   | Main Backend  |
                                                                                   | (Persist Data)|
                                                                                   +---------------+
```

## 3. Data Flow

1. **Client Request**
   * HTTP POST to `/recommend` with JSON payload containing:
     * `user_embedding`: L2-normalized float vector
     * `job_ids`: array of job identifiers
     * `job_embeddings`: array of L2-normalized job vectors
     * `top_k` (optional)

2. **FastAPI Handler**
   * Validates request schema via Pydantic
   * Parses JSON into native Python types

3. **Similarity Search**
   * Calls `cosine_similarity(user_emb, job_embs)` from scikit-learn
   * Picks top-K indices via `argsort` & slicing

4. **Response Serialization**
   * Maps top indices back to `job_ids`
   * Returns JSON: list of `{ job_id, score }`

5. **Client/RTE**
   * Displays results; caller persists or caches recommendations

## 4. Model Architecture & Dependencies

* **Embedding Model**: `sentence-transformers/all-MiniLM-L6-v2` (384-dim vectors)
  * **Why**: Excellent speed/accuracy trade-off, CPU-friendly, <50 ms per 10 texts.

* **Alternative**: `intfloat/e5-small-v2` (256-dim), for even lower latency.

* **Similarity Search**: `scikit-learn`'s `cosine_similarity` for simplicity; can swap to **Faiss** for ≥100 K vectors.

* **Core Libraries**:
  * **FastAPI** (ASGI framework)
  * **Pydantic** (data validation)
  * **sentence-transformers** (SBERT)
  * **scikit-learn** (cosine similarity)
  * **NumPy** (vector ops)

## 5. Performance & Scaling

* **Latency < 3s**:
  * **Embedding**: precompute job embeddings; only user inference at runtime (≈ 5 ms).
  * **Search**: CPU-bound cosine similarity for N≈1 000 jobs → ≈ 1–10 ms.
  * **Overhead**: HTTP + JSON parse ≈ 50 ms; total ≈ 100 ms per request.

## 6. Extension Points & Trade-Offs

* **Model Swap**: Change `MODEL_NAME` env var to `e5-small-v2` → restart pods.

* **Hybrid Features**:
  * Incorporate collaborative signals as additional vector dimensions.

* **Limitations**:
  * Content-only; cold-start for new jobs relies purely on text quality.
  * CPU-only search may struggle beyond N>10^5; consider Faiss or vector DB.

* **Monitoring Hooks**:
  * Export Prometheus metrics: `request_count`, `latency_seconds`, `embedding_time_ms`.
  * Tracing via OpenTelemetry for request flow and BERT inference.

## 7. Security Architecture

* **API Security**:
  * Rate limiting
  * Input validation
  * CORS configuration
  * API key authentication

* **Data Security**:
  * Text sanitization
  * Embedding validation
  * Secure storage of user profiles

## 8. Deployment Architecture

* **Containerization**:
  * Docker for application packaging
  * Docker Compose for local development
  * Kubernetes for production deployment

* **Scaling Strategy**:
  * Horizontal scaling with load balancer
  * Redis for caching
  * Vector database for large-scale job embeddings

## 9. Monitoring & Logging

* **Metrics Collection**:
  * Prometheus for metrics
  * Grafana for visualization
  * ELK stack for logging

* **Health Checks**:
  * API health endpoint
  * Model inference checks
  * Cache status monitoring

