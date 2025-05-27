# Requirements

This document outlines system prerequisites and references the Python dependencies for the AI-only job recommendation service.

---

## 1. Python Dependencies

All core Python libraries and exact versions are listed in the project's `requirements.txt` file.

---

## 2. System Prerequisites

* **Operating System**:

  * Linux (Ubuntu 20.04+, Debian), macOS 11+, or Windows 10+ (WSL2 recommended).
* **Python**:

  * Python 3.10 or newer.
* **Docker** (optional):

  * Docker 20.10+ for containerized deployment.
* **GPU Drivers** (optional):

  * CUDA Toolkit 11.x, NVIDIA driver 470.x+ if using GPU inference.
* **Kubernetes CLI** (optional):

  * `kubectl` for cluster management.

---



## a. Hardware Recommendations

* **CPU‑only**: Suitable for small to medium workloads (<10 K jobs).
* **GPU‑accelerated**: Recommended if embedding throughput or lower latency (<10 ms) is critical.

---

