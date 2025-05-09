# Content‑Based Job Recommendation Service

This repository contains the AI‑only microservice for real‑time, content‑based job recommendations. It embeds user skills and job descriptions using pre‑trained transformer models and ranks jobs by cosine similarity.

---

## 🚀 Features

* **FastAPI** endpoints for ingestion and recommendation
* **Sentence‑Transformers** embeddings (MiniLM, E5‑small)
* **Explicit chunking** for long text descriptions
* **Cosine similarity** ranking (top‑7 by default)
* Stateless: persistence handled by upstream backend
* Configurable via environment variables

---

## 📦 Prerequisites

* Python 3.10+
* Docker (optional)
* Kubernetes CLI (for K8s deployment)
* (Optional) CUDA GPU for accelerated embeddings

---

## ⚙️ Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-org/job-recommender-ai.git
   cd job-recommender-ai
   ```

2. **Create a virtual environment**

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

---

## 📝 Configuration

Set the following **environment variables** (or use a `.env` file):

```dotenv
MODEL_NAME=all-MiniLM-L6-v2
DEVICE=cpu            # or 'cuda'
TOP_K=7               # number of recommendations
REDIS_URL=           # if using Redis cache
LOG_LEVEL=info
```

---

## ▶️ Running Locally

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

* API docs available at [http://localhost:8000/docs](http://localhost:8000/docs)
* Health endpoint: `GET /health`

---

## 🐳 Docker

```bash
# Build image
docker build -t job-recommender-ai:latest .
# Run container
docker run -e MODEL_NAME=all-MiniLM-L6-v2 -p 8000:8000 job-recommender-ai:latest
```

---

## ☸️ Kubernetes

Apply the manifests in `k8s/` (or your own Helm chart):

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
```

---

## 📚 Documentation

All additional docs are in the `docs/` folder:

* **`deployment_guide.md`**: Docker/K8s & CI/CD
* **`embedding_strategy.md`**: Model choices & preprocessing
* **`model_overview.md`**: Encoder architecture & specs
* **`recommendation_pipeline.md`**: Data flow & pseudocode
* **`testing_guide.md`**: Manual & automated tests

---

## 🧪 Testing

```bash
pytest --cov=app
```

For manual tests, use Swagger UI or `curl` commands as described in `docs/testing_guide.md`.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit PRs for new features, bug fixes, or documentation improvements.

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details.
