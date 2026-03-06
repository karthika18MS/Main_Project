import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

data = pd.read_csv("src/ai/dataset/booking_history.csv")

X = data[["guest_count"]]
y = data["budget"]

model = LinearRegression()
model.fit(X, y)

with open("src/ai/models/budget_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Budget model trained")
