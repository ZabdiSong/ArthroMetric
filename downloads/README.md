# ArthroMetric — Arthropod Classifier

Interactive scoring, a morphological key, AHP weighting, and sensitivity exploration.

## Views

- **Scoring & KNN:** Seven named index scores, an interactive radar comparison, distances to four class references, and a score matrix.
- **Morphological key:** A simplified adult-specimen guide to four broad groups.
- **AHP:** Pairwise judgments, criterion weights, consistency ratio, and editable comparative scores.
- **Sensitivity:** A 101-point sweep of one index, with distance curves and group changes.

## Scoring data

Source: slide 12, **Scoring Index of KNN**, and the code screenshot on slide 13 of the supplied science fair presentation.

| Reference / sample | Segments | Antennae | Wings | Legs | Respiration | Environment | Diet |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Arachnids | 3 | 4 | 4 | 3 | 1 | 4 | 4 |
| Crustaceans | 4 | 1 | 4 | 2 | 4 | 1 | 1 |
| Insects | 2 | 2.5 | 1 | 4 | 1 | 4 | 2.5 |
| Myriapods | 1 | 2.5 | 4 | 1 | 1 | 4 | 4 |
| Rhinoceros beetle sample | 2 | 2.5 | 1 | 4 | 1 | 4 | 2.5 |

Each row contains seven separate coded scores. KNN uses Euclidean distance with k = 1; it does not sum them into a total score. Continuous slider values explore the calculation rather than assign new biological categories.

### Source details

- Antennae: the table and code use **2.5** for one pair; the slide's text key says **1.5**. This website follows the table and code.
- Leg counts appear to describe pairs: three for insects and four for arachnids. This unit is inferred from the table.
- The slide labels respiration categories “Lungs” (1) and “Gills” (4). These are source labels, not reliable descriptions for every represented group. The supplied numeric rows are reproduced for model exploration.
- The PPT table contains four class references and one beetle sample. A nine-species dataset is not included.

AHP uses the supplied four criteria and example scores. Starting pairwise ratios are derived from the supplied weights. Comparative scores do not establish invasiveness.

## File inventory

| Path | Content |
| --- | --- |
| `index.html`, `style.css`, `app.js` | Interface and interactions |
| `model.js`, `charts.js` | Calculations and SVG charts |
| `assets/poster.jpg` | Science fair poster |
| `downloads/original/` | Supplied Python files |

## Run or publish

Run `python -m http.server 8000` from the directory containing `index.html`, then open `http://localhost:8000`.

For GitHub Pages, upload the package contents to the repository root and select **Settings → Pages → Deploy from a branch → main / (root)**.
