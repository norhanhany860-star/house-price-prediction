import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  const handlePrediction = (price: number) => {
    setPredictedPrice(price);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage onPrediction={handlePrediction} />
          }
        />

        <Route
          path="/result"
          element={
            <ResultPage price={predictedPrice} />
          }
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;