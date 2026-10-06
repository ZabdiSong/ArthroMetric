import numpy as np

# Example pairwise comparison matrix for Criterion 1
matrix_criterion_1 = np.array([[1, 0.33, 0.25], [3, 1, 0.67], [4, 2, 1]])

# Calculate the eigenvalue and eigenvector
eigenvalues, eigenvectors = np.linalg.eig(matrix_criterion_1)

# Normalize the eigenvector to get the weights
weights_criterion_1 = eigenvectors[:, 0] / np.sum(eigenvectors[:, 0])

print("Weights for Criterion 1:", weights_criterion_1)

