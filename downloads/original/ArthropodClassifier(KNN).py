import streamlit as st

# Clear the page
st.empty()

import math
sample_data = {"A": [3, 4, 4, 3, 1, 4, 4, "arachnids"],
"B": [4, 1, 4, 2, 4, 1, 1, "crustaceans"],               
"C": [2, 2.5, 1, 4, 1, 4, 2.5, "insects"],
"D": [1, 2.5, 4, 1, 1, 4, 4, "myriapods"],}
x = [2, 2.5, 1, 4, 1, 4, 2.5]

# Calculating the distance
KNN = []
for key, v in sample_data.items():
    d = math.sqrt((x[0] - v[0]) ** 2 + (x[1] - v[1])
** 2 + (x[2] - v[2]) ** 2 + (x[3] - v[3]) ** 2 + (x[4] - v[4]) ** 2 + (x[5] - v[5]) ** 2 + (x[6] - v[6]) ** 2)
    KNN.append([key, round(d, 2)])

# Outpt data
print(KNN)

# Rangement
KNN.sort(key=lambda dis: dis[1])

# Select the closest sample
KNN=KNN[:1]
print(KNN)

# Ensure the frequency
labels = {"arachnids":0,"crustaceans":0,"insects":0,"myriapods":0,}
for s in KNN:
    label = sample_data[s[0]]
    labels[label[-1]] += 1
labels =sorted(labels.items(),key=lambda l: l[1],
reverse=True)
print (labels, labels[0][0], sep='\n')

               
