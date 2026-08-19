from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.inference import load_model
from app.api.routes.prediction import router, set_model


@asynccontextmanager
async def lifespan(app: FastAPI):

    print("Loading house price model...")

    model = load_model()

    set_model(model)

    print("Model loaded successfully!")

    yield

    print("Shutting down...")


app = FastAPI(
    title="House Price Prediction API",
    description="API for predicting house prices",
    version="1.0.0",
    lifespan=lifespan
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)