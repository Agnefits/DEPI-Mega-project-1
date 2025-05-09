# API Endpoints

## 1. `POST /generate-questions`
Generates interview questions.

### Request Body (JSON)
```json
{
  "role": "data scientist",
  "level": "junior",
  "experience": "1 year in Python and basic ML",
  "num_questions": 5
}
```

### Response Body (JSON)
```json
{
  "questions": [
    "What is overfitting in machine learning?",
    "..."
  ]
}
```

## 2. `POST /evaluate-answers`
Evaluates user's answers.

### Request Body (JSON)
```json
{
  "role": "data scientist",
  "level": "junior",
  "qa": [
    {"question": "What is overfitting?", "answer": "When model fits training data too well..."}
  ]
}
```

### Response Body (JSON)
```json
{
  "evaluation": "Score: 7/10
Strengths: ...
Improvements: ..."
}
```