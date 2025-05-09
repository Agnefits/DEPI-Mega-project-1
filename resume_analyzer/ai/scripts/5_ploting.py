import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix, precision_recall_curve, roc_curve, auc
import numpy as np

def plot_classification_metrics(y_true, y_pred, y_probs=None, class_names=None):
    """
    Plot the classification metrics: Accuracy, Precision, Recall, F1-score, and Confusion Matrix.
    Also, optionally plot Precision-Recall curve and ROC curve if probabilities are provided.
    
    Args:
        y_true (list): List of true labels.
        y_pred (list): List of predicted labels.
        y_probs (list, optional): List of predicted probabilities for ROC/PR curves (default is None).
        class_names (list, optional): Class labels for confusion matrix axis (default is None).
    """
    # Generate classification report
    report = classification_report(y_true, y_pred, target_names=class_names, output_dict=True)
    
    # Extract metrics from the classification report
    metrics = {
        'Accuracy': report['accuracy'],
        'Precision': report['weighted avg']['precision'],
        'Recall': report['weighted avg']['recall'],
        'F1-score': report['weighted avg']['f1-score'],
        'Support': report['weighted avg']['support']
    }
    
    # Plot the bar chart for Accuracy, Precision, Recall, F1-score
    plt.figure(figsize=(10, 6))
    plt.bar(metrics.keys(), metrics.values(), color=['#4CAF50', '#FFC107', '#2196F3', '#FF5722', '#8BC34A'])
    plt.title('Classification Metrics', fontsize=14)
    plt.ylabel('Score', fontsize=12)
    plt.ylim(0, 1)
    for i, v in enumerate(metrics.values()):
        plt.text(i, v + 0.01, f'{v:.2f}', ha='center', fontsize=10)
    plt.show()
    
    # Plot Precision-Recall Curve if probabilities are provided
    if y_probs is not None:
        precision, recall, _ = precision_recall_curve(y_true, y_probs)
        plt.figure(figsize=(8, 6))
        plt.plot(recall, precision, color='blue', lw=2, label='Precision-Recall curve')
        plt.xlabel('Recall', fontsize=12)
        plt.ylabel('Precision', fontsize=12)
        plt.title('Precision-Recall Curve', fontsize=14)
        plt.legend(loc="best")
        plt.show()

        # Plot ROC Curve
        fpr, tpr, _ = roc_curve(y_true, y_probs)
        roc_auc = auc(fpr, tpr)
        plt.figure(figsize=(8, 6))
        plt.plot(fpr, tpr, color='darkorange', lw=2, label='ROC curve (area = %0.2f)' % roc_auc)
        plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
        plt.xlim([0.0, 1.0])
        plt.ylim([0.0, 1.05])
        plt.xlabel('False Positive Rate', fontsize=12)
        plt.ylabel('True Positive Rate', fontsize=12)
        plt.title('Receiver Operating Characteristic (ROC) Curve', fontsize=14)
        plt.legend(loc="lower right")
        plt.show()

def plot_confusion_matrix(y_true, y_pred, labels=None, normalize=False):
    """
    Plot the confusion matrix using seaborn heatmap.
    
    Args:
        y_true (list): List of true labels.
        y_pred (list): List of predicted labels.
        labels (list): List of class labels for confusion matrix axis.
        normalize (bool): Whether to normalize the confusion matrix (default is False).
    """
    # Compute confusion matrix
    cm = confusion_matrix(y_true, y_pred, labels=labels)
    
    # Normalize the confusion matrix if needed
    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
    
    # Plot confusion matrix using seaborn heatmap
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='.2f' if normalize else 'g', cmap='Blues', xticklabels=labels, yticklabels=labels, cbar=False)
    plt.title('Confusion Matrix', fontsize=14)
    plt.xlabel('Predicted Label', fontsize=12)
    plt.ylabel('True Label', fontsize=12)
    plt.show()

# Example Usage:
# To use the functions, simply call them with the appropriate arguments:

# Example true labels and predicted labels
y_true = [0, 1, 1, 0, 1, 0, 1, 1, 0, 1]
y_pred = [0, 1, 1, 0, 1, 0, 0, 1, 0, 1]
y_probs = [0.2, 0.8, 0.7, 0.4, 0.9, 0.3, 0.2, 0.6, 0.1, 0.7]  # Example probabilities for the positive class
labels = [0, 1]  # In a binary classification case

# Plot the classification metrics (Accuracy, Precision, Recall, F1-score)
plot_classification_metrics(y_true, y_pred, y_probs=y_probs, class_names=['Class 0', 'Class 1'])

# Plot the confusion matrix
plot_confusion_matrix(y_true, y_pred, labels=labels, normalize=True)