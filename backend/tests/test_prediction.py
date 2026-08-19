from fastapi.testclient import TestClient
from app.main import app


def test_predict_success():
    with TestClient(app) as client:
        response = client.post(
            "/predict",
            json={
                "location": "Whitefield",
                "carpet_area_clean": 1200,
                "floor_clean": 3,
                "Bathroom_clean": 2,
                "Balcony_clean": 1,
                "Furnishing": "Semi-Furnished",
                "Transaction": "Resale",
                "Ownership": "Freehold",
                "facing": "East"
            }
        )

        assert response.status_code == 200

        data = response.json()

        assert "predicted_price" in data
        assert isinstance(data["predicted_price"], float)


def test_predict_invalid_input():
    with TestClient(app) as client:
        response = client.post(
            "/predict",
            json={
                "location": "Whitefield",
                "carpet_area_clean": -100,
                "floor_clean": 3,
                "Bathroom_clean": 2,
                "Balcony_clean": 1,
                "Furnishing": "Semi-Furnished",
                "Transaction": "Resale",
                "Ownership": "Freehold",
                "facing": "East"
            }
        )

        assert response.status_code == 422