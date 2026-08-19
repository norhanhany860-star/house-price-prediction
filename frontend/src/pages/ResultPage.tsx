import { useNavigate } from "react-router-dom";

interface ResultPageProps {
  price: number | null;
}

function ResultPage({ price }: ResultPageProps) {
  const navigate = useNavigate();

  if (price === null) {
    navigate("/");
    return null;
  }

  return (
    <div className="result-container">
      <div className="result-card">

        <div className="success-icon">
        </div>

        <h1>Prediction Completed</h1>

        <h2>Estimated House Price</h2>

        <div className="price">
          ₹ {price.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          Predict Another Property
        </button>

      </div>
    </div>
  );
}

export default ResultPage;

