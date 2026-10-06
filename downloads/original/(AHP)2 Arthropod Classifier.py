import numpy as np

class AHP:
    def __init__(self):
        self.criteria_weights = {}
        self.evaluation_matrix = []

    def add_criteria(self, name, weight):
        """Add a new criterion."""
        self.criteria_weights[name] = weight

    def add_evaluation(self, organism, evaluations):
        """Add an evaluation for an organism."""
        # Assuming evaluations is a dictionary mapping criteria names to scores
        self.evaluation_matrix.append([evaluations.get(name, 0) for name in self.criteria_weights])

    def calculate_synthesized_scores(self):
        """Calculate the synthesized scores for each organism."""
        # Calculate the weighted sum for each organism
        return [[sum(a * b for a, b in zip(pow, values)) for values in zip(*self.evaluation_matrix)]]

    def classify_organisms(self):
        """Classify organisms based on synthesized scores."""
        synthesized_scores = self.calculate_synthesized_scores()
        threshold = np.mean(synthesized_scores[0])  # Simple threshold calculation
        return ["Invasive" if score > threshold else "Not Invasive" for score in synthesized_scores[0]]

# Example usage
ahp = AHP()

# Adding criteria with their weights
ahp.add_criteria("Impact on Ecosystem", 0.3)
ahp.add_criteria("Economic Impact", 0.25)
ahp.add_criteria("Native Range", 0.15)
ahp.add_criteria("Dispersal Ability", 0.2)

# Adding evaluations for an organism
organism_evaluations = {
    "Impact on Ecosystem": 8,
    "Economic Impact": 7,
    "Native Range": 6,
    "Dispersal Ability": 9
}
ahp.add_evaluation("Organism X", organism_evaluations)

# Classifying the organism
classification = ahp.classify_organisms()
print(classification)