from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in .env file")

# Configure Gemini model
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()

# Enable CORS for all origins (or specify specific domains)
origins = [
    "*",  # Allow all origins (use with caution in production)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins or specific domains
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# === Request Schemas ===
class InterviewRequest(BaseModel):
    role: str
    level: str
    experience: str
    num_questions: int

class QAItem(BaseModel):
    question: str
    answer: str

class EvaluationRequest(BaseModel):
    role: str
    level: str
    qa: list[QAItem]

# === Routes ===

@app.get("/")
def read_root():
    return {"message": "Interview API is running!"}

@app.post("/generate-questions")
def generate_questions(data: InterviewRequest):
    if not (1 <= data.num_questions <= 10):
        raise HTTPException(status_code=400, detail="num_questions must be between 1 and 10")

    chat = model.start_chat(history=[])
    prompt = f"""
    Generate {data.num_questions} technical interview questions for:
    - Role: {data.role}
    - Level: {data.level}
    - Experience: {data.experience}

    Return ONLY the questions as a numbered list.
    """
    response = chat.send_message(prompt)
    questions = [q.strip() for q in response.text.split('\n') if q.strip()][:data.num_questions]
    return {"questions": questions}


@app.post("/evaluate-answers")
def evaluate_answers(data: EvaluationRequest):
    chat = model.start_chat(history=[])

    qa_pairs = "\n".join([f"Q: {item.question}\nA: {item.answer}" for item in data.qa])

    prompt = f"""
    Evaluate this interview for a {data.level} {data.role} candidate:

    {qa_pairs}

    Provide concise:
    1. Score/10
    2. Top 2 strengths
    3. Top 2 improvement areas  
    4. One actionable advice

    Format in clear sections.
    """
    response = chat.send_message(prompt)
    return {"evaluation": response.text}
