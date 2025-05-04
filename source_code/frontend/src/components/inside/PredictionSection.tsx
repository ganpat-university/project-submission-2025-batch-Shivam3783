import React from 'react';
import { Brain } from 'lucide-react';


interface PredictionSectionProps {
  company: {
    name: string;
    symbol: string;
  };
}

function PredictionSection({ company }: PredictionSectionProps) {
  // Mock prediction data - replace with actual model predictions
  const mockPrediction = {
    nextDayPrice: 155.75,
    confidence: 85,
    trend: 'upward',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-6 w-6 text-indigo-600" />
        <h3 className="text-xl font-semibold">AI Price Prediction</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Predicted Next Day Price</div>
          <div className="text-2xl font-bold text-indigo-600">
            ${mockPrediction.nextDayPrice}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Confidence Level</div>
          <div className="text-2xl font-bold text-indigo-600">
            {mockPrediction.confidence}%
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Predicted Trend</div>
          <div className="text-2xl font-bold text-indigo-600 capitalize">
            {mockPrediction.trend}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
        <p className="text-sm text-indigo-800">
          This prediction is based on historical data and market trends. Please note that stock market predictions are not guaranteed and should not be the sole basis for investment decisions.
        </p>
      </div>
    </div>
  );
}

export default PredictionSection;