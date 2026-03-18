from fastapi import FastAPI
import joblib

app = FastAPI()

model = joblib.load("models/gb_vendor_recommender.pkl")

@app.post("/predict")
def predict(data: dict):

    vendors = data["vendors"]

    features = []

    for v in vendors:
        features.append([
            v["rating"],
            v["review_count"],
            v["booking_count"],
            v["starting_price"],
            v["max_price"],
            v["avg_package_price"],
            v["gallery_size"],
            v["vendor_age_days"],
            v["user_budget"]
        ])

    scores = model.predict(features)

    return {"scores": scores.tolist()}