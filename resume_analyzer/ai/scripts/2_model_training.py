import os
import torch
from torch.utils.data import DataLoader
from transformers import BertTokenizer, BertForSequenceClassification, AdamW, get_linear_schedule_with_warmup
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import numpy as np
from tqdm import tqdm
import logging
from torch.cuda.amp import GradScaler, autocast  # For mixed precision training
from torch.utils.tensorboard import SummaryWriter  # For TensorBoard logging
from utils.data_utils import preprocess_data  # Assuming you have a data_utils.py for handling data preprocessing

# Set device for training (GPU if available)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# TensorBoard writer
writer = SummaryWriter(log_dir="logs")

# Load pre-trained BERT tokenizer and model for fine-tuning
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)  # 2 labels: matched or not
model.to(device)

# Initialize the gradient scaler for mixed precision training
scaler = GradScaler()

def tokenize_data(resumes, job_descriptions):
    """
    Tokenizes the text data using BERT tokenizer.

    Args:
        resumes (list): List of processed resumes.
        job_descriptions (list): List of processed job descriptions.

    Returns:
        dict: Tokenized inputs for BERT model.
    """
    encodings = tokenizer(
        resumes, 
        job_descriptions, 
        truncation=True, 
        padding=True, 
        max_length=256,  # Adjust max length if necessary
        return_tensors='pt'
    )
    return encodings

def train_model():
    """
    Train the model on preprocessed resume-job description data.
    """
    # Load the preprocessed data (resumes and job descriptions)
    resumes_folder = 'data/resumes/'
    job_desc_folder = 'data/job_descriptions/'
    df = preprocess_data(resumes_folder, job_desc_folder)  # Returns a DataFrame
    
    # Prepare the data: Stratified train and test split
    X_train, X_test, y_train, y_test = train_test_split(df['resume'], df['job_description'], test_size=0.2, stratify=df['job_description'])

    # Tokenize the data
    train_encodings = tokenize_data(X_train, X_test)
    test_encodings = tokenize_data(X_test, y_test)

    # Create DataLoader for batching
    train_dataset = torch.utils.data.TensorDataset(
        train_encodings['input_ids'], 
        train_encodings['attention_mask'], 
        torch.tensor(y_train.values)
    )

    test_dataset = torch.utils.data.TensorDataset(
        test_encodings['input_ids'], 
        test_encodings['attention_mask'], 
        torch.tensor(y_test.values)
    )

    train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=16)

    # Set up the optimizer and scheduler
    optimizer = AdamW(model.parameters(), lr=1e-5)
    total_steps = len(train_loader) * 3  # Number of steps for 3 epochs
    scheduler = get_linear_schedule_with_warmup(optimizer, 
                                                num_warmup_steps=0, 
                                                num_training_steps=total_steps)

    # Early stopping setup
    best_accuracy = 0.0
    patience = 2  # Number of epochs with no improvement before stopping
    epochs_without_improvement = 0
    best_model_path = "models/sbert_model/best_model"

    # Train the model
    model.train()
    epochs = 3  # Number of epochs (you can experiment with this)
    
    for epoch in range(epochs):
        loop = tqdm(train_loader, desc=f"Epoch {epoch+1}/{epochs}")
        total_loss = 0
        
        for batch in loop:
            input_ids, attention_mask, labels = [item.to(device) for item in batch]
            optimizer.zero_grad()
            
            with autocast():  # Mixed precision
                # Forward pass
                outputs = model(input_ids, attention_mask=attention_mask, labels=labels)
                loss = outputs.loss
                total_loss += loss.item()

            # Backward pass
            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()
            scheduler.step()

            loop.set_postfix(loss=total_loss / len(loop))

        writer.add_scalar('Loss/train', total_loss / len(loop), epoch)

        # Evaluate after each epoch
        accuracy, report, cm = evaluate_model(test_loader, model, device)

        # Save the best model based on accuracy
        if accuracy > best_accuracy:
            best_accuracy = accuracy
            model.save_pretrained(best_model_path)
            tokenizer.save_pretrained(best_model_path)
            epochs_without_improvement = 0
        else:
            epochs_without_improvement += 1
        
        # Early stopping
        if epochs_without_improvement >= patience:
            break

    writer.close()

def evaluate_model(test_loader, model, device):
    """
    Evaluate the trained model on the test set.
    
    Args:
        test_loader (DataLoader): The DataLoader for the test set.
        model (BertForSequenceClassification): The trained model.
        device (torch.device): The device (GPU/CPU) to run the model.
    """
    model.eval()
    predictions = []
    true_labels = []

    with torch.no_grad():
        for batch in tqdm(test_loader, desc="Evaluating"):
            input_ids, attention_mask, labels = [item.to(device) for item in batch]
            
            # Forward pass
            outputs = model(input_ids, attention_mask=attention_mask)
            logits = outputs.logits
            
            # Get predictions
            preds = torch.argmax(logits, dim=1)
            predictions.extend(preds.cpu().numpy())
            true_labels.extend(labels.cpu().numpy())
    
    # Evaluate the model performance
    accuracy = accuracy_score(true_labels, predictions)

    cm = confusion_matrix(true_labels, predictions)

    # TensorBoard logging
    writer.add_scalar('Accuracy/test', accuracy, 0)
    writer.add_text('Classification Report', classification_report(true_labels, predictions), 0)

    return accuracy, classification_report(true_labels, predictions), cm

