export interface PredictionRequest {
  location: string;
  carpet_area_clean: number;
  floor_clean: number;
  Bathroom_clean: number;
  Balcony_clean: number;
  Furnishing: string;
  Transaction: string;
  Ownership: string;
  facing: string;
}

export interface PredictionResponse {
  predicted_price: number;
}