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
* **Output Vector**: L2-normalized before similarity comparisons
* **Alternative Pooling Methods**:
  * Max pooling
  * CLS token pooling
  * Attention pooling

```plaintext
[Token Embeddings] → mean(...) → [Sequence Embedding]
```

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
  * Multi-task learning for job matching

---

## 5. Model Variants

### Primary Model: MiniLM-L6-v2
* 6 transformer layers
* 384-dimensional embeddings
* Optimized for CPU inference
* Good balance of speed and accuracy

### Alternative Model: E5-small-v2
* 12 transformer layers
* 256-dimensional embeddings
* Better for edge devices
* Faster inference time

---

## 6. Performance Characteristics

### Speed
* CPU inference: < 50ms per text
* GPU inference: < 10ms per text
* Batch processing: 32 texts at once

---

## 7. Monitoring & Maintenance

### Performance Monitoring
* Inference latency
* Memory usage
* GPU utilization
* Batch processing stats

### Model Maintenance
* Regular evaluation
* Performance benchmarking
* Quality metrics tracking
* Version control

---

## 8. Future Improvements

### Model Enhancements
* Larger model variants
* Multi-lingual support
* Domain-specific fine-tuning
* Custom architectures

### Infrastructure
* Distributed serving
* Model quantization
* Dynamic batching
* Auto-scaling

