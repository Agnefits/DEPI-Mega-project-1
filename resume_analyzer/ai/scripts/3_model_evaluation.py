import torch
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from torch.utils.tensorboard import SummaryWriter
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from tqdm import tqdm

# Set up TensorBoard writer
writer = SummaryWriter(log_dir="logs")

def plot_confusion_matrix(cm, class_names):
    """
    Plots confusion matrix as a heatmap.
    Args:
        cm (numpy.ndarray): Confusion matrix.
        class_names (list): List of class names.
    """
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=class_names, yticklabels=class_names)
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.title('Confusion Matrix')
    plt.tight_layout()

    # Save the figure to TensorBoard
    plt.savefig('confusion_matrix.png')
    plt.close()

    # Log the image to TensorBoard
    writer.add_image('Confusion Matrix', 'confusion_matrix.png', 0)

def evaluate_model(test_loader, model, device, class_names):
    """
    Evaluate the trained model on the test set.
    
    Args:
        test_loader (DataLoader): The DataLoader for the test set.
        model (BertForSequenceClassification): The trained model.
        device (torch.device): The device (GPU/CPU) to run the model.
        class_names (list): List of class names for multi-class classification.
    
    Returns:
        accuracy (float): The accuracy of the model on the test set.
        report (str): The classification report as a string.
        cm (numpy.ndarray): The confusion matrix.
    """
    model.eval()
    predictions = []
    true_labels = []

    with torch.no_grad():
        # Iterate over batches in the test_loader
        for batch in tqdm(test_loader, desc="Evaluating"):
            input_ids, attention_mask, labels = [item.to(device) for item in batch]
            
            # Forward pass
            outputs = model(input_ids, attention_mask=attention_mask)
            logits = outputs.logits
            
            # Get predictions
            preds = torch.argmax(logits, dim=1)
            predictions.extend(preds.cpu().numpy())
            true_labels.extend(labels.cpu().numpy())

    # Calculate accuracy
    accuracy = accuracy_score(true_labels, predictions)
    print(f"Accuracy: {accuracy * 100:.2f}%")

    # Generate classification report
    report = classification_report(true_labels, predictions, target_names=class_names)
    print("Classification Report:")
    print(report)

    # Generate confusion matrix
    cm = confusion_matrix(true_labels, predictions)
    print("Confusion Matrix:")
    print(cm)

    # Plot and log confusion matrix as an image
    plot_confusion_matrix(cm, class_names)

    # Log accuracy and classification report to TensorBoard
    writer.add_scalar('Accuracy/test', accuracy, 0)
    writer.add_text('Classification Report', report, 0)

    return accuracy, report, cm

if _name_ == "_main_":
    # Assuming the test_loader, model, and device are already set up
    class_names = ['Not Matched', 'Matched']  # Modify this list based on your class names
    accuracy, report, cm = evaluate_model(test_loader, model, device, class_names)