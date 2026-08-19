import streamlit as st
import pandas as pd
import joblib
import json


# -----------------------------
# Page Configuration
# -----------------------------
st.set_page_config(
    page_title="House Price Prediction",
    page_icon="🏠",
    layout="centered"
)


# -----------------------------
# Load Model & Locations
# -----------------------------
@st.cache_resource
def load_model():
    return joblib.load("models/house_price.pkl")


@st.cache_data
def load_locations():
    with open("config/locations.json", "r") as f:
        return json.load(f)


model = load_model()
locations = load_locations()


# -----------------------------
# Title
# -----------------------------
st.title("🏠 House Price Prediction")

st.write(
    "Enter the property details below to predict the estimated house price."
)


# -----------------------------
# Input Fields
# -----------------------------
location = st.selectbox(
    "Location",
    locations
)

carpet_area = st.number_input(
    "Carpet Area (sqft)",
    min_value=1.0,
    value=1000.0,
    step=50.0
)

floor = st.number_input(
    "Floor",
    min_value=0,
    value=1,
    step=1
)

bathroom = st.number_input(
    "Bathrooms",
    min_value=1,
    value=2,
    step=1
)

balcony = st.number_input(
    "Balconies",
    min_value=0,
    value=1,
    step=1
)

furnishing = st.selectbox(
    "Furnishing",
    [
        "Unfurnished",
        "Semi-Furnished",
        "Furnished"
    ]
)

transaction = st.selectbox(
    "Transaction",
    [
        "Resale",
        "New Property",
        "Other",
        "Rent/Lease"
    ]
)

ownership = st.selectbox(
    "Ownership",
    [
        "Freehold",
        "Co-operative Society",
        "Power Of Attorney",
        "Leasehold"
    ]
)

facing = st.selectbox(
    "Facing",
    [
        "East",
        "West",
        "North - East",
        "North",
        "North - West",
        "South",
        "South -West",
        "South - East"
    ]
)


# -----------------------------
# Prediction
# -----------------------------
if st.button("Predict Price", type="primary"):

    input_data = pd.DataFrame({
        "carpet_area_clean": [carpet_area],
        "floor_clean": [floor],
        "Bathroom_clean": [bathroom],
        "Balcony_clean": [balcony],
        "location_clean": [location],
        "Furnishing": [furnishing],
        "Transaction": [transaction],
        "Ownership": [ownership],
        "facing": [facing]
    })

    try:
        prediction = model.predict(input_data)[0]

        st.success("Prediction completed successfully!")

        st.metric(
            label="Estimated House Price",
            value=f"₹ {prediction:,.0f}"
        )

    except Exception as e:
        st.error(f"Prediction error: {e}")