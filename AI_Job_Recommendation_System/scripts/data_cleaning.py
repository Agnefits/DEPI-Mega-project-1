import pandas as pd
import numpy as np
import re
import ast

# -----------------------
# Utility: clean URLs, emails, phone numbers
# -----------------------

def clean_text(text: str) -> str:
    # Remove web links
    text = re.sub(r"http\S+|www\.\S+", " ", text)
    # Remove email addresses
    text = re.sub(r"\S+@\S+", " ", text)
    # Remove phone numbers (digits, dashes/spaces, length ≥9)
    text = re.sub(r"\+?\d[\d\-\s]{7,}\d", " ", text)
    # Collapse all consecutive whitespace into single spaces
    text = re.sub(r"\s+", " ", text)
    return text.strip()



# -----------------------
# Utility: load & prepare raw job data
# -----------------------

def load_and_prepare_jobs(data_path: str) -> pd.DataFrame: 
    # Read CSV into DataFrame
    df = pd.read_csv(data_path)
    # Reset index to ensure continuous integer IDs
    df = df.reset_index(drop=True)
    # Rename Job-Title column to Job_title
    df = df.rename(columns={'Job-Title': 'Job_title'})
    # Drop any rows missing essential fields
    df = df.dropna(subset=["Job_title", "Description", "Location"]).copy()
    # Create a unique job_id based on the DataFrame index
    df["job_id"] = df.index.astype(int)

    df["title_clean"] = df["Job_title"].apply(clean_text)
    df["desc_clean"] = df["Description"].apply(clean_text)
    df["text"] = df["title_clean"] + " " + df["desc_clean"]
    return df




def load_normalized_user_skills(file_path):
    """
    Load normalized user skills from a CSV file and convert them to a list of lists.

    Parameters:
    - file_path (str): The path to the CSV file containing the normalized user skills.

    Returns:
    - List[List[str]]: A list of lists containing the normalized user skills.
    """
    # Load the normalized user skills DataFrame
    normalized_user_skills = pd.read_csv(file_path)

    # Drop the 'Unnamed: 0' column if it exists
    if 'Unnamed: 0' in normalized_user_skills.columns:
        normalized_user_skills.drop(['Unnamed: 0'], axis=1, inplace=True)

    # Assuming the first column contains the string representations of the lists
    normalized_user_skills_list = normalized_user_skills.iloc[:, 0].apply(ast.literal_eval).tolist()

    return normalized_user_skills_list