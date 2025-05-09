# API Routes Documentation

This document describes the RESTful API endpoints exposed by the AI-driven job recommendation service.

---

## Base URL

All endpoints are served under the same base URL, e.g.,:

```
http://<host>:<port>
```

---

## 1. Health Check

**Endpoint**: `GET /health`
**Purpose**: Verify the service is running and responsive.

### Request

* No parameters or body.

### Response

```json
{ "status": "ok" }
```

* **status** (`string`): Always returns "ok" when healthy.

---

## 2. Ingest Job Embedding

**Endpoint**: `POST /ingest/job`
**Purpose**: Accept a single job record, generate its text embedding, and return it to the caller.
**Persistence**: Handled externally by the backend integration.

### Request Headers

```
Content-Type: application/json
```

### Request Body\*\* (JSON)\*\*

| Field         | Type    | Description                            |
| ------------- | ------- | -------------------------------------- |
| `job_id`      | integer | Unique identifier for the job posting. |
| `description` | string  | Full job description + job title text. |


#### Example

```json
{
  "job_id": 42,
  "description": "Build ETL pipelines and manage data lakes.",
}
```

### Response Body\*\* (JSON)\*\*

| Field       | Type     | Description                                   |
| ----------- | -------- | --------------------------------------------- |
| `status`    | string   | Confirmation message.                         |
| `job_id`    | integer  | The same `job_id` received in the request.    |
| `embedding` | float\[] | L2-normalized embedding vector (e.g., 384-d). |

#### Example

```json
{
  "status": "job embedding generated",
  "job_id": 42,
  "embedding": [0.123, -0.456, 0.789, ...]
}
```

---

## 3. Ingest User Embedding

**Endpoint**: `POST /ingest/user`
**Purpose**: Accept a single user record, generate its skill-based embedding, and return it.
**Persistence**: Handled externally by the backend integration.

### Request Headers

```
Content-Type: application/json
```

### Request Body\*\* (JSON)\*\*

| Field     | Type      | Description                                            |
| --------- | --------- | ------------------------------------------------------ |
| `user_id` | integer   | Unique identifier for the user profile.                |
| `skills`  | string\[] | List of user skill strings (e.g., \["python", "etl"]). |

#### Example

```json
{
  "user_id": 7,
  "skills": ["python", "etl", "data engineering"]
}
```

### Response Body\*\* (JSON)\*\*

| Field       | Type     | Description                                 |
| ----------- | -------- | ------------------------------------------- |
| `status`    | string   | Confirmation message.                       |
| `user_id`   | integer  | The same `user_id` received in the request. |
| `embedding` | float\[] | L2-normalized user embedding vector.        |

#### Example

```json
{
  "status": "user embedding generated",
  "user_id": 7,
  "embedding": [0.234, -0.345, 0.456, ...]
}
```

---

## 4. Recommend Jobs

**Endpoint**: `POST /recommend`
**Purpose**: Given a user embedding and a set of job embeddings, compute cosine similarities and return the top-N job recommendations.

### Request Headers

```
Content-Type: application/json
```

### Request Body\*\* (JSON)\*\*

| Field            | Type        | Description                                        |
| ---------------- | ----------- | -------------------------------------------------- |
| `user_id`        | integer     | User identifier (optional, for logging).           |
| `user_embedding` | float\[]    | Precomputed L2-normalized user embedding vector.   |
| `job_ids`        | integer\[]  | List of job IDs corresponding to `job_embeddings`. |
| `job_embeddings` | float\[]\[] | List of L2-normalized job embedding vectors.       |
| `top_k`          | integer     | Number of top results to return (default: 7).      |

#### Example

```json
{
  "user_id": 7,
  "user_embedding": [0.234, -0.345, 0.456, ...],
  "job_ids": [42, 43, 44],
  "job_embeddings": [
    [0.123, -0.456, 0.789, ...],
    [-0.234, 0.567, -0.890, ...],
    [0.345, -0.678, 0.901, ...]
  ],
  "top_k": 3
}
```

### Response Body\*\* (JSON)\*\*

| Field             | Type      | Description                        |
| ----------------- | --------- | ---------------------------------- |
| `recommendations` | object\[] | List of job recommendations:       |
|   `job_id`        | integer   | ID of the recommended job.         |
|   `score`         | number    | Cosine similarity score (0.0–1.0). |

#### Example

```json
{
  "recommendations": [
    {"job_id": 42, "score": 0.87},
    {"job_id": 44, "score": 0.63},
    {"job_id": 43, "score": 0.42}
  ]
}
```

---

### Notes

* All embeddings are expected to be **L2-normalized** before consumption by `/recommend`.
* The service does **not** persist any data; it only computes and returns embeddings or recommendations.
* Upstream persistence (storing embeddings, logging, etc.) should be handled by the caller (e.g., your main backend).

---
