import pandas as pd
import pickle
from sklearn.cluster import KMeans

data = pd.read_csv("src/ai/dataset/vendor_data.csv")

model = KMeans(n_clusters=3)
model.fit(data[["price"]])

with open("src/ai/models/recommendation_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Recommendation model trained")
