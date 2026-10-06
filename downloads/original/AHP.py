import numpy as np

def calculate_eigenvalue(matrix):
    n = len(matrix)
    sum_of_diagonal_elements = np.trace(matrix)
    return sum_of_diagonal_elements / n

def calculate_consistency_ratio(eigenvalue, max_eigenvalue):
    return (eigenvalue - len(matrix) + 1) / (len(matrix) * (max_eigenvalue - eigenvalue))

# Example pairwise comparison matrices for different criteria
criteria = ['Ecological Impact', 'Economic Impact', 'Spread Rate', 'Native Status']
matrix_eco_impact = np.array([[1, 0.167, 0.143, 0.111],
                              [6, 1, 0.571, 0.429],
                              [7, 1.75, 1, 0.714],
                              [9, 2.286, 1.414, 1]])
matrix_econ_impact = np.array([[1, 0.333, 0.25, 0.2],
                               [3, 1, 0.667, 0.444],
                               [4, 1.5, 1, 0.666],
                               [5, 2.25, 1.5, 1]])
matrix_spread_rate = np.array([[1, 0.2, 0.166, 0.125],
                               [5, 1, 0.625, 0.416],
                               [6, 1.5, 1, 0.714],
                               [8, 2.4, 1.428, 1]])
matrix_native_status = np.array([[1, 0.111, 0.083, 0.062],
                                 [9, 1, 0.909, 0.636],
                                 [12, 1.111, 1, 0.833],
                                 [16, 1.585, 1.192, 1]])

# Calculate eigenvalues and consistency ratios for each matrix
for i, matrix in enumerate([matrix_eco_impact, matrix_econ_impact, matrix_spread_rate, matrix_native_status], start=1):
    eigenvalue = calculate_eigenvalue(matrix)
    max_eigenvalue = np.max(np.linalg.eigvals(matrix))
    consistency_ratio = calculate_consistency_ratio(eigenvalue, max_eigenvalue)
    
    print(f"Criteria {i}:")
    print(f"Eigenvalue: {eigenvalue}")
    print(f"Consistency Ratio: {consistency_ratio}\n")

# Assuming consistency ratios are acceptable (typically < 0.1), proceed to aggregate weights
# This part requires further assumptions about the relative importance of each criterion and the options being compared