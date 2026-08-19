import pandas as pd

from app.schemas.prediction import PredictionRequest


def preprocess_input(data: PredictionRequest) -> pd.DataFrame:
    df = pd.DataFrame([{
        "carpet_area_clean": data.carpet_area_clean,
        "floor_clean": data.floor_clean,
        "Bathroom_clean": data.Bathroom_clean,
        "Balcony_clean": data.Balcony_clean,
        "location_clean": data.location,
        "Furnishing": data.Furnishing,
        "Transaction": data.Transaction,
        "Ownership": data.Ownership,
        "facing": data.facing,
    }])

    return df