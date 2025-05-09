import os
import logging
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(_name_)

# Initialize Sentence Transformer model (using pre-trained model)
model = SentenceTransformer('all-MiniLM-L6-v2')  # Example model

def clean_text(text):
    """
    Clean the text by removing special characters, numbers, and extra spaces.
    Convert to lowercase and remove stopwords.

    Args:
        text (str): Raw text to be cleaned.

    Returns:
        str: Cleaned text.
    """
    try:
        # Convert to lowercase
        text = text.lower()

        # Remove special characters and numbers
        text = re.sub(r'[^a-z\s]', '', text)

        # Remove extra spaces
        text = re.sub(r'\s+', ' ', text).strip()

        # Return cleaned text
        return text
    except Exception as e:
        logger.error(f"Error during text cleaning: {e}")
        return ""

def read_and_clean_file(file_path):
    """
    Read a file and clean its contents.
    
    Args:
        file_path (str): Path to the file to be read and cleaned.
    
    Returns:
        str: Cleaned content of the file.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
        return clean_text(text)
    except Exception as e:
        logger.error(f"Error reading or cleaning file {file_path}: {e}")
        return ""

def infer_similarity(resume_text, job_desc_text):
    """
    Predict the similarity between a resume and a job description using the Sentence Transformer.
    
    Args:
        resume_text (str): The resume text to compare.
        job_desc_text (str): The job description text to compare.
    
    Returns:
        float: Cosine similarity score between the resume and job description.
    """
    try:
        # Clean and encode the texts
        resume_cleaned = clean_text(resume_text)
        job_desc_cleaned = clean_text(job_desc_text)

        # Generate embeddings for the resume and job description
        resume_embedding = model.encode([resume_cleaned], convert_to_tensor=True)
        job_desc_embedding = model.encode([job_desc_cleaned], convert_to_tensor=True)

        # Calculate cosine similarity
        similarity_score = cosine_similarity(resume_embedding, job_desc_embedding)

        logger.info(f"Cosine Similarity Score: {similarity_score[0][0] * 100:.2f}%")
        return similarity_score[0][0] * 100  # Return similarity as a percentage

    except Exception as e:
        logger.error(f"Error during similarity calculation: {e}")
        return 0.0

def predict_match(resume_file, job_desc_file):
    """
    Load resume and job description files, and predict their similarity.
    
    Args:
        resume_file (str): Path to the resume file.
        job_desc_file (str): Path to the job description file.
    
    Returns:
        float: Similarity percentage.
    """
    try:
        # Read and clean the resume and job description files
        resume_text = read_and_clean_file(resume_file)
        job_desc_text = read_and_clean_file(job_desc_file)

        # Predict similarity
        similarity_score = infer_similarity(resume_text, job_desc_text)

        # Determine if the resume matches the job description
        if similarity_score > 75:
            logger.info("The resume matches the job description.")
        else:
            logger.info("The resume does not match the job description.")
        
        return similarity_score

    except Exception as e:
        logger.error(f"Error in prediction process: {e}")
        return 0.0

if _name_ == "_main_":
    # Example usage
    resume_file = 'data/resumes/example_resume.txt'  # Path to a resume file
    job_desc_file = 'data/job_descriptions/example_job_desc.txt'  # Path to a job description file

    similarity_score = predict_match(resume_file, job_desc_file)
    print(f"Similarity Score: {similarity_score:.2f}%")