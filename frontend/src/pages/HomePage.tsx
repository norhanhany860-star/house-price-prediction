import PredictionForm from "../components/PredictionForm";

interface HomePageProps {
  onPrediction: (price: number) => void;
}

function HomePage({ onPrediction }: HomePageProps) {
  return (
    <div className="home-container">

      <div className="prediction-card">

        <h1>🏠 House Price Prediction</h1>

        <h2>
          Enter the property details below to predict
          the estimated house price.
        </h2>

        <PredictionForm onPrediction={onPrediction} />

      </div>

    </div>
  );
}

export default HomePage;