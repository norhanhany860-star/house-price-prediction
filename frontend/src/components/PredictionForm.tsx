import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictPrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";

interface PredictionFormProps {
  onPrediction: (price: number) => void;
}

function PredictionForm({ onPrediction }: PredictionFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PredictionRequest>({
    location: "Whitefield",
    carpet_area_clean: 0,
    floor_clean: 0,
    Bathroom_clean: 0,
    Balcony_clean: 0,
    Furnishing: "Furnished",
    Transaction: "Resale",
    Ownership: "Freehold",
    facing: "East",
  });

  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load locations from locations.json
  useEffect(() => {
    fetch("/locations.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load locations");
        }

        return response.json();
      })
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error("Failed to load locations:", error);
        setError("Unable to load locations.");
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const numericFields = [
      "carpet_area_clean",
      "floor_clean",
      "Bathroom_clean",
      "Balcony_clean",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.location) {
      setError("Please select a location.");
      return;
    }

    if (formData.carpet_area_clean <= 0) {
      setError("Carpet area must be greater than 0.");
      return;
    }

    if (
      formData.floor_clean < 0 ||
      formData.Bathroom_clean < 0 ||
      formData.Balcony_clean < 0
    ) {
      setError("Floor, bathrooms and balconies cannot be negative.");
      return;
    }

    try {
      setLoading(true);

      const result = await predictPrice(formData);
      onPrediction(result.predicted_price);
      navigate("/result");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <form className="prediction-form" onSubmit={handleSubmit}>
    {/* Location */}
    <div className="full-width">
      <label>Location</label>

      <select
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      >
        <option value="">Select Location</option>

        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>

    {/* Carpet Area */}
    <div>
      <label>Carpet Area (sqft)</label>

      <input
        type="number"
        name="carpet_area_clean"
        value={formData.carpet_area_clean}
        onChange={handleChange}
        min="10"
        required
      />
    </div>

    {/* Floor */}
    <div>
      <label>Floor</label>

      <input
        type="number"
        name="floor_clean"
        value={formData.floor_clean}
        onChange={handleChange}
        min="-1"
        required
      />
    </div>

    {/* Bathrooms */}
    <div>
      <label>Bathrooms</label>

      <input
        type="number"
        name="Bathroom_clean"
        value={formData.Bathroom_clean}
        onChange={handleChange}
        min="0"
        required
      />
    </div>

    {/* Balconies */}
    <div>
      <label>Balconies</label>

      <input
        type="number"
        name="Balcony_clean"
        value={formData.Balcony_clean}
        onChange={handleChange}
        min="0"
        required
      />
    </div>

    {/* Furnishing */}
    <div>
      <label>Furnishing</label>

      <select
        name="Furnishing"
        value={formData.Furnishing}
        onChange={handleChange}
        required
      >
        <option value="Furnished">Furnished</option>
        <option value="Semi-Furnished">Semi-Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
      </select>
    </div>

    {/* Transaction */}
    <div>
      <label>Transaction</label>

      <select
        name="Transaction"
        value={formData.Transaction}
        onChange={handleChange}
        required
      >
        <option value="New Property">New Property</option>
        <option value="Resale">Resale</option>
        <option value="Rent/Lease">Rent/Lease</option>
        <option value="Other">Other</option>

      </select>
    </div>

    {/* Ownership */}
    <div>
      <label>Ownership</label>

      <select
        name="Ownership"
        value={formData.Ownership}
        onChange={handleChange}
        required
      >
        <option value="Freehold">Freehold</option>
        <option value="Leasehold">Leasehold</option>
        <option value="Co-operative Society">Co-operative Society</option>
        <option value="Power Of Attorney">Power Of Attorney</option>


      </select>
    </div>

    {/* Facing */}
    <div>
      <label>Facing</label>

      <select
        name="facing"
        value={formData.facing}
        onChange={handleChange}
        required
      >
        <option value="East">East</option>
        <option value="West">West</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="North - East">North - East</option>
        <option value="North - West">North - West</option>
        <option value="South -West">South -West</option>
        <option value="South - East">South - East</option>

      </select>
    </div>

    {/* Error */}
    {error && (
      <p className="error-message">
        {error}
      </p>
    )}

    {/* Button */}
    <button
      className="predict-button"
      type="submit"
      disabled={loading}
    >
      {loading ? "Predicting..." : "Predict Price"}
    </button>
  </form>
);
}

export default PredictionForm;