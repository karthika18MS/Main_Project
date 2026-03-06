
import sys
import pickle
import json
import pandas as pd

# Arguments from Node.js
input_data = json.loads(sys.argv[1])

guest_count = input_data.get("guestCount")
budget = input_data.get("budget")

# Load models
with open("src/ai/models/budget_model.pkl", "rb") as f:
    budget_model = pickle.load(f)

with open("src/ai/models/recommendation_model.pkl", "rb") as f:
    recommendation_model = pickle.load(f)

# Budget prediction
predicted_budget = budget_model.predict([[guest_count]])[0]

# Vendor recommendation
vendors_df = pd.read_csv("src/ai/dataset/vendor_data.csv")
recommended = vendors_df.sample(3).to_dict(orient="records")

result = {
    "predictedBudget": int(predicted_budget),
    "recommendedVendors": recommended
}

print(json.dumps(result))
