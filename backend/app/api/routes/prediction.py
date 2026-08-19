from fastapi import APIRouter

from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse
)

from app.services.preprocessing import preprocess_input
from app.services.inference import predict


router = APIRouter()

model = None


def set_model(loaded_model):
    global model
    model = loaded_model


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict_price(data: PredictionRequest):

    input_df = preprocess_input(data)

    predicted_price = predict(model, input_df)

    return {
        "predicted_price": predicted_price
    }