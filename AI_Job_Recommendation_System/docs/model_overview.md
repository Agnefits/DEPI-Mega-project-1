# Model Overview

This document provides a high-level view of the embedding models and pooling mechanisms used in the Content-Based Job Recommendation system.

---

## 1. Transformer Encoder

* **Model Family**: `sentence-transformers` (SBERT) based on HuggingFace
* **Examples**:

  * `all-MiniLM-L6-v2` (MiniLM): 6-layer, 384-dimensional output
  * `intfloat/e5-small-v2`: 12-layer, 256-dimensional output

### Encoder Architecture

```
[Input Text]
   ↓ Tokenizer
[Token IDs]
   ↓ Transformer Encoder (L layers)
[Token Embeddings]
```

* **Layers**: Transformer blocks with multi-head self-attention
* **Hidden Size**: Model-specific (e.g. 384 for MiniLM)
* **Params**: \~22M (MiniLM) → \~30M (E5-small)

---

## 2. Pooling Head

* **Mean Pooling**: Average token embeddings across the sequence

```plaintext
[Token Embeddings] → mean(...) → [Sequence Embedding]
```

* **Output Vector**: L2-normalized before similarity comparisons

---

## 3. Input/Output Shapes & Performance

| Stage         | Shape                        | Time (CPU)   |
| ------------- | ---------------------------- | ------------ |
| Tokenization  | (batch\_size, seq\_len)      | \~2 ms/text  |
| Encoding      | (batch\_size, seq\_len, dim) | \~10 ms/text |
| Pooling       | (batch\_size, dim)           | < 1 ms/text  |
| Normalization | (batch\_size, dim)           | < 1 ms/text  |

* **Batch Throughput**: \~500 texts/sec on CPU (batch\_size=32)
* **Latency**: < 50 ms per short text end‑to‑end

---

## 4. Training & Fine-Tuning

* **Pre-trained on**:

  * Natural Language Inference (NLI) datasets
  * Semantic Textual Similarity (STS) benchmarks
* **Fine-tuning Objectives** (future work):

  * Contrastive learning on job–application pairs
  * Domain adaptation with in-house job descriptions

---

## 5. Extension Points

* **Swap Encoder**: Change `MODEL_NAME` environment variable (e.g., to `intfloat/e5-mistral-7b-instruct`) quantize and redeploy
* **Custom Pooling**: Replace mean pooling with attention pooling or max pooling via model config
* **Parameter Tuning**: Add chunk size, stride, or add sliding-window overlap

