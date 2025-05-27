# Deployment Guide

This guide provides instructions for deploying the AI Job Recommendation System API.

## System Requirements

### Prerequisites
- Python 3.8 or higher
- FastAPI
- sentence-transformers
- scikit-learn
- numpy
- uvicorn (for ASGI server)

## Deployment Steps

### 1. Environment Setup

1. **Clone the Repository**
```bash
git clone https://github.com/yousufelshrif/Job_Recomendation_System
cd AI_Job_Recommendation_System
```

2. **Create Virtual Environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

### 2. Application Configuration

The application uses the following key components:
- FastAPI for the web framework
- Sentence-BERT (all-MiniLM-L6-v2) for text embeddings
- scikit-learn for cosine similarity calculations
- numpy for numerical operations

### 3. Running the Application

1. **Development Mode**
```bash
uvicorn app.main:app --reload
```

2. **Production Mode**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 4. API Endpoints

The system provides the following endpoints:

1. **Job Ingestion**
   - Endpoint: `POST /ingest/job`
   - Input: Job ID and description
   - Output: Generated job embedding

2. **User Ingestion**
   - Endpoint: `POST /ingest/user`
   - Input: User ID and skills list
   - Output: Generated user embedding

3. **Job Recommendations**
   - Endpoint: `POST /recommend`
   - Input: User embedding, job IDs, and job embeddings
   - Output: Top-k job recommendations with similarity scores

4. **Health Check**
   - Endpoint: `GET /`
   - Output: System status

### 5. Model Configuration

The system uses the following model configuration:
- Embedding Model: `all-MiniLM-L6-v2`
- Device: CPU (configurable)
- Text Processing: URL, email, and phone number removal
- Embedding Normalization: L2 normalization

### 6. Performance Considerations

1. **Embedding Generation**
   - Job descriptions are processed individually
   - User skills are mean-pooled for embedding generation
   - All embeddings are L2-normalized

2. **Recommendation Engine**
   - Uses cosine similarity for matching
   - Configurable top-k results
   - Efficient numpy operations for similarity calculations

### 7. Monitoring

The application includes basic logging:
- Logging level: INFO
- Output: stdout
- Startup message logging
- API endpoint logging

### 8. Security Considerations

1. **Input Validation**
   - Pydantic models for request validation
   - Text cleaning for job descriptions
   - Type checking for embeddings

2. **Error Handling**
   - FastAPI automatic error responses
   - Input validation errors
   - Processing errors

### 9. Scaling Considerations

1. **Horizontal Scaling**
   - Stateless API design
   - Independent job and user processing
   - Batch processing support

2. **Performance Optimization**
   - Efficient embedding generation
   - Optimized similarity calculations
   - Configurable batch sizes

### 10. Troubleshooting

Common issues and solutions:

1. **Model Loading Issues**
   - Verify sentence-transformers installation
   - Check model name and availability
   - Verify device configuration

2. **Performance Issues**
   - Monitor memory usage
   - Check batch sizes
   - Verify input data quality

3. **API Issues**
   - Check endpoint availability
   - Verify input format
   - Check response format

### 11. Maintenance

1. **Regular Updates**
   - Update dependencies
   - Monitor model performance
   - Check system logs

2. **Backup Considerations**
   - Backup trained models
   - Backup configuration files
   - Document deployment settings 