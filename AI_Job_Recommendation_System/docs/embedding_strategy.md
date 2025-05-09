# Embedding Strategy

This document outlines the embedding approach for user profiles and job descriptions in the content‑based job recommendation system.

---

## 1. Chosen Embedding Models

| Model                      | Dim | Rationale                                             |
| -------------------------- | --- | ----------------------------------------------------- |
| `all-MiniLM-L6-v2` (SBERT) | 384 | Fast inference, strong semantic capture, CPU-friendly |
| `intfloat/e5-small-v2`     | 256 | Lower dimensionality, faster on edge devices          |

* Models are loaded via **SentenceTransformers**.
* Use `DEVICE=cpu` for mainline, `cuda` if GPU is available.

---

## 2. Pre‑ and Post‑Processing

### Text Cleaning (Pre‑process)

* Lowercase all text
* Remove URLs, emails, phone numbers
* Collapse whitespace to single spaces

```python
def clean_text(text: str) -> str:
    # Remove links/emails/phones, collapse spaces
    ...
    return cleaned
```

### Tokenization & Encoding

* Tokenizer from SentenceTransformers handles subword splitting
* No manual tokenization needed unless customizing

### Normalization (Post‑process)

* **L2‑normalize** each vector for cosine similarity

```python
from sklearn.preprocessing import normalize
embs = model.encode(texts)
embs = normalize(embs, norm='l2', axis=1)
```

---

## 3. Handling Variable Text Lengths

| Text Length       | Strategy                   |
| ----------------- | -------------------------- |
| Short (<512 tok.) | Encode directly            |
| Long (>512 tok.)  | take the 512 first tokens  |

---

## 4. Caching & Batching

* **Batch Encoding**: use `model.encode(list_of_texts, batch_size=32)` for throughput
* **Cache** embeddings for:

  * Frequently requested users (Redis)
  * All job embeddings (in-memory or vector DB)

---

## 5. Production Best Practices

* Warm up the model on startup with a few dummy texts
* Monitor inference latency (Prometheus)
* Rotate models via environment variable `MODEL_NAME` without code changes


