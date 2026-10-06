# Define the criteria and their weights
criteria_weights = {
    "Ecological Impact": 0.11030392,
    "Origin": 0.25813635,
    "Spreadability": 0.56221594,
    "Economic Impact": 0.06934380
}

# Data for Rhinoceros Beetle and a comparison group 
# Replace these values with actual data collected
rhino_beetle_scores = {
    "Ecological Impact": 8,  
    "Origin": 7,  
    "Spreadability": 9, 
    "Economic Impact": 6  
}
comparison_group_scores = {
    "Ecological Impact": 5, 
    "Origin": 4, 
    "Spreadability": 3,  
    "Economic Impact": 4  
}

# Function to calculate the weighted score
def calculate_weighted_score(scores, weights):
    return sum(score * weight for score, weight in zip(scores.values(), weights.values()))

# Calculate the weighted scores for both groups
rhino_beetle_weighted_score = calculate_weighted_score(rhino_beetle_scores, criteria_weights)
comparison_group_weighted_score = calculate_weighted_score(comparison_group_scores, criteria_weights)

# Print the results
print(f"Rhinoceros Beetle Weighted Score: {rhino_beetle_weighted_score}")
print(f"Comparison Group Weighted Score: {comparison_group_weighted_score}")

# Determine if the Rhinoceros Beetle is considered invasive based on the weighted scores
if rhino_beetle_weighted_score > comparison_group_weighted_score:
    print("The Rhinoceros Beetle is likely considered invasive.")
else:
    print("The Rhinoceros Beetle is not likely considered invasive.")
