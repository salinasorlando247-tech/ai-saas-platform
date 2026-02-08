from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    prediction = {
        "engagement_score": random.uniform(50, 95),
        "risk_score": random.uniform(1, 20)
    }

    return jsonify(prediction)

if __name__ == "__main__":
    app.run(port=5001)
