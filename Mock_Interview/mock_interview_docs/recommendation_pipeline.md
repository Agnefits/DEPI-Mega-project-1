# Evaluation Pipeline

1. User submits role, level, experience and answers.
2. FastAPI endpoint sends question/answer pairs to Gemini.
3. Gemini returns evaluation with score, strengths, weaknesses, and advice.
4. FastAPI formats and returns the response to client.

This pipeline allows for rapid feedback without storing any personal data.