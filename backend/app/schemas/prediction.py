from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    location: str
    carpet_area_clean: float = Field(gt=0)
    floor_clean: int = Field(ge=-1)
    Bathroom_clean: int = Field(ge=0)
    Balcony_clean: int = Field(ge=0)
    Furnishing: str
    Transaction: str
    Ownership: str
    facing: str


class PredictionResponse(BaseModel):
    predicted_price: float