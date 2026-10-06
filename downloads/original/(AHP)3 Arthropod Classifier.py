import numpy as np

class AHP:
    def __init__(self):
        self.criteria_weights = {}
        self.organism_evaluations = {}

    def add_criteria(self, name, weight):
        """Add a new criterion."""
        self.criteria_weights[name] = weight

    def evaluate_organism(self, organism_name, evaluations):
        """Evaluate an organism based on given evaluations."""
        total_score = sum([evaluations[organism_name][criterion] * self.criteria_weights[criterion] for criterion in evaluations[organism_name]])
        return total_score

    def classify_organism(self, organism_name, evaluations):
        """Classify the organism as invasive or not based on its score."""
        score = self.evaluate_organism(organism_name, evaluations)
        threshold = sum(self.criteria_weights.values()) / len(self.criteria_weights)
        if score >= threshold:
            print(f"{organism_name} is classified as an invasive species.")
        else:
            print(f"{organism_name} is not classified as an invasive species.")

# Example usage
ahp = AHP()
ahp.add_criteria("Origin", 0.16)
ahp.add_criteria("Economic Impact", 0.04)
ahp.add_criteria("Ecological Impact", 0.07)
ahp.add_criteria("Spread Ability", 0.35)

# Example evaluations for an organism
evaluations = {
    "OrganismX": {"Origin": 0, "Economic Impact": 0.01, "Ecological Impact": 0.05, "Spread Ability": 0.3},
}

ahp.classify_organism("OrganismX", evaluations)