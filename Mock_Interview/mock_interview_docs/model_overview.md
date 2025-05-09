# Model Overview

## Gemini 1.5 Flash
The application uses Google’s Gemini 1.5 Flash model for:
- Generating contextual interview questions.
- Providing automated evaluation with feedback.

## Configuration
API Key is stored in `.env` file and loaded using `python-dotenv`. The model is initialized with:
```python
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
```

## Prompt Engineering
Prompts are tailored to include role, level, and experience, formatted to return specific structured outputs.