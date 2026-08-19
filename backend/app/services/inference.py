import joblib
import os


MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
    "models",
    "house_price.pkl"
)


def load_model():
    return joblib.load(MODEL_PATH)


def predict(model, data):
    prediction = model.predict(data)

    return float(prediction[0])