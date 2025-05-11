# Architecture

## Overview
This project uses a simple client-server architecture:

- **Client**: Frontend or Postman to send requests.
- **Backend**: FastAPI app with two POST endpoints.
- **LLM**: Gemini 1.5 Flash API used to generate questions and evaluate answers.

## Deployment Stack
- **Language**: Python 3.10+
- **Framework**: FastAPI
- **LLM Provider**: Google Generative AI (Gemini)
- **Tunnel**: Ngrok
- **Testing**: Postman