
import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { format, addDays } from 'date-fns';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { BarChart3, LineChart, PieChart, Calendar, TrendingUp } from 'lucide-react';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  company: {
    symbol: string;
  };
}

type ChartType = 'line' | 'bar' | 'pie';
type TimeRange = '1W' | '1M' | '3M' | '1Y';
type PredictionRange = '1M' | '2M' | '3M' | '6M';

function StockChart({ company }: StockChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionRange, setPredictionRange] = useState<PredictionRange>('1M');
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [predictedData, setPredictedData] = useState<{ date: string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const backend_url = import.meta.env.VITE_BACKEND_FLASK_URL;

  const isIndianExchange = (symbol: string) => {
    return symbol.endsWith('.BSE') || symbol.endsWith('.BO') || symbol.endsWith('.NSE') || symbol.endsWith('.NS');
  };
  

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backend_url}/stocks/${company.symbol.toLowerCase()}/historical/${timeRange}`);
        const data = response.data;

        const formattedData = Object.entries(data).map(([date, stockData]) => ({
          date,
          close: parseFloat(stockData['4. close']),
          high: parseFloat(stockData['2. high']),
          low: parseFloat(stockData['3. low']),
          open: parseFloat(stockData['1. open']),
          volume: parseInt(stockData['5. volume']),
        }));

        setHistoricalData(formattedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
      setLoading(false);
    };

    fetchHistoricalData();
  }, [company.symbol, timeRange]);

  useEffect(() => {
    if (showPrediction) {
      const fetchPredictions = async () => {
        try {
          const response = await axios.post(`${backend_url}/predict`, {
            ticker: company.symbol,
            start_date: '2010-01-01',
            end_date: new Date().toISOString().split('T')[0],
            days: parseInt(predictionRange) * 30,
          });

          setPredictedData(response.data.predictions);
        } catch (error) {
          console.error('Error fetching predictions:', error);
        }
      };

      fetchPredictions();
    }
  }, [showPrediction, predictionRange, company.symbol]);

  const prepareChartData = () => {
    if (!historicalData || historicalData.length === 0) return null;

    const dates = historicalData.map(d => format(new Date(d.date), 'MMM d'));
    const prices = historicalData.map(d => d.close);

    const predictionDates = showPrediction
      ? predictedData.map(p => format(new Date(p.date), 'MMM d'))
      : [];

    const predictionPrices = showPrediction
      ? predictedData.map(p => p.price)
      : [];

    if (chartType === 'pie') {
      return {
        labels: ['Current Price', 'Day High', 'Day Low'],
        datasets: [
          {
            data: [
              prices[prices.length - 1],
              Math.max(...prices),
              Math.min(...prices),
            ],
            backgroundColor: ['#4f46e5', '#10b981', '#ef4444'],
          },
        ],
      };
    }

    return {
      labels: [...dates, ...predictionDates],
      datasets: [
        {
          label: 'Historical Price',
          data: prices,
          borderColor: '#4f46e5',
          backgroundColor: chartType === 'bar' ? 'rgba(79, 70, 229, 0.5)' : 'transparent',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointBackgroundColor: '#4f46e5',
          pointHoverBackgroundColor: '#4f46e5',
          pointBorderColor: '#fff',
          pointHoverBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverBorderWidth: 3,
          tension: 0.4,
        },
        showPrediction && {
          label: 'Predicted Price',
          data: [...Array(dates.length).fill(null), ...predictionPrices],
          borderColor: '#10b981',
          backgroundColor: chartType === 'bar' ? 'rgba(16, 185, 129, 0.5)' : 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 4,
          pointHoverRadius: 8,
          pointBackgroundColor: '#10b981',
          pointHoverBackgroundColor: '#10b981',
          pointBorderColor: '#fff',
          pointHoverBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverBorderWidth: 3,
          tension: 0.4,
        },
      ].filter(Boolean),
    };
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: chartType !== 'pie' ? {
      x: {
        ticks: {
          font: { size: 12 },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          font: { size: 12 },
          // callback: (value: any) => `$${value.toFixed(2)}`,
          callback: (value: any) => {
            // Show ₹ if the company is from an Indian exchange
            const currencySymbol = isIndianExchange(company.symbol) ? '₹' : '$';
            return `${currencySymbol} ${value.toFixed(2)}`;
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
      },
    } : undefined,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyColor: '#4b5563',
        bodyFont: {
          size: 13,
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw?.toFixed(2) || '0.00';
            // return `${label}: $${value}`;
            const currencySymbol = isIndianExchange(company.symbol) ? '₹' : '$';
            return `${label}: ${currencySymbol} ${value}`;
          
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const ChartComponent = {
    line: Line,
    bar: Bar,
    pie: Pie,
  }[chartType];

  if (!ChartComponent) {
    return <div>Error: Invalid chart type</div>;
  }

  const chartTypeIcons = {
    line: <LineChart className="w-5 h-5" />,
    bar: <BarChart3 className="w-5 h-5" />,
    pie: <PieChart className="w-5 h-5" />,
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart Type Selection */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Chart Type</h3>
          <div className="grid grid-cols-3 gap-2">
            {(['line', 'bar', 'pie'] as ChartType[]).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`flex items-center justify-center p-3 rounded-lg transition-all ${
                  chartType === type
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  {chartTypeIcons[type]}
                  <span className="text-xs font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Range Selection */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Time Range</h3>
          <div className="grid grid-cols-4 gap-2">
            {(['1W', '1M', '3M', '1Y'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`flex items-center justify-center p-3 rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">{range}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Controls */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Prediction</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowPrediction(!showPrediction)}
              className={`flex items-center justify-center p-3 rounded-lg transition-all ${
                showPrediction
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">{showPrediction ? 'Hide Prediction' : 'Show Prediction'}</span>
              </div>
            </button>

            {showPrediction && (
              <select
                value={predictionRange}
                onChange={(e) => setPredictionRange(e.target.value as PredictionRange)}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="1M">1 Month Prediction</option>
                <option value="2M">2 Months Prediction</option>
                <option value="3M">3 Months Prediction</option>
                <option value="6M">6 Months Prediction</option>
              </select>
            )}
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full">
        {prepareChartData() && <ChartComponent data={prepareChartData()} options={chartOptions} />}
      </div>

      {showPrediction && chartType !== 'pie' && (
        <div className="flex items-center justify-center space-x-6 text-sm bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-indigo-600"></div>
            <span className="text-gray-600">Historical Price</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-green-500 border-dashed"></div>
            <span className="text-gray-600">Predicted Price</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockChart;

//working code with Model

// import React, { useState, useEffect } from 'react';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import { format, addDays } from 'date-fns';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   ArcElement,
// } from 'chart.js';
// import { BarChart3, LineChart, PieChart, Calendar, TrendingUp } from 'lucide-react';

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface StockChartProps {
//   company: {
//     symbol: string;
//   };
// }

// type ChartType = 'line' | 'bar' | 'pie';
// type TimeRange = '1W' | '1M' | '3M' | '1Y';
// type PredictionRange = '1M' | '2M' | '3M' | '6M';

// function StockChart({ company }: StockChartProps) {
//   const [timeRange, setTimeRange] = useState<TimeRange>('1M');
//   const [chartType, setChartType] = useState<ChartType>('line');
//   const [showPrediction, setShowPrediction] = useState(false);
//   const [predictionRange, setPredictionRange] = useState<PredictionRange>('1M');
//   const [historicalData, setHistoricalData] = useState<any[]>([]);
//   const [predictedData, setPredictedData] = useState<{ date: string; price: number }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const backend_url = import.meta.env.VITE_BACKEND_FLASK_URL;

//   useEffect(() => {
//     const fetchHistoricalData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${backend_url}/stocks/${company.symbol.toLowerCase()}/historical/${timeRange}`);
//         const data = response.data;

//         const formattedData = Object.entries(data).map(([date, stockData]) => ({
//           date,
//           close: parseFloat(stockData['4. close']),
//           high: parseFloat(stockData['2. high']),
//           low: parseFloat(stockData['3. low']),
//           open: parseFloat(stockData['1. open']),
//           volume: parseInt(stockData['5. volume']),
//         }));

//         setHistoricalData(formattedData);
//       } catch (error) {
//         console.error('Error fetching historical data:', error);
//       }
//       setLoading(false);
//     };

//     fetchHistoricalData();
//   }, [company.symbol, timeRange]);

//   useEffect(() => {
//     if (showPrediction) {
//       const fetchPredictions = async () => {
//         try {
//           const response = await axios.post(`${backend_url}/predict`, {
//             ticker: company.symbol,
//             start_date: '2010-01-01',
//             end_date: new Date().toISOString().split('T')[0], // Today's date
//             days: parseInt(predictionRange) * 30, // Convert months to days
//           });

//           setPredictedData(response.data.predictions);
//         } catch (error) {
//           console.error('Error fetching predictions:', error);
//         }
//       };

//       fetchPredictions();
//     }
//   }, [showPrediction, predictionRange, company.symbol]);

//   const prepareChartData = () => {
//     if (!historicalData || historicalData.length === 0) return null;

//     const dates = historicalData.map(d => format(new Date(d.date), 'MMM d'));
//     const prices = historicalData.map(d => d.close);

//     const predictionDates = showPrediction
//       ? predictedData.map(p => format(new Date(p.date), 'MMM d'))
//       : [];

//     const predictionPrices = showPrediction
//       ? predictedData.map(p => p.price)
//       : [];

//     if (chartType === 'pie') {
//       return {
//         labels: ['Current Price', 'Day High', 'Day Low'],
//         datasets: [
//           {
//             data: [
//               prices[prices.length - 1],
//               Math.max(...prices),
//               Math.min(...prices),
//             ],
//             backgroundColor: ['#4f46e5', '#10b981', '#ef4444'],
//           },
//         ],
//       };
//     }

//     return {
//       labels: [...dates, ...predictionDates],
//       datasets: [
//         {
//           label: 'Historical Price',
//           data: prices,
//           borderColor: '#4f46e5',
//           backgroundColor: chartType === 'bar' ? 'rgba(79, 70, 229, 0.5)' : 'transparent',
//           borderWidth: 2,
//           pointRadius: chartType === 'line' ? 0 : undefined,
//         },
//         showPrediction && {
//           label: 'Predicted Price',
//           data: [...Array(dates.length).fill(null), ...predictionPrices],
//           borderColor: '#10b981',
//           backgroundColor: chartType === 'bar' ? 'rgba(16, 185, 129, 0.5)' : 'transparent',
//           borderWidth: 2,
//           borderDash: [5, 5],
//           pointRadius: chartType === 'line' ? 0 : undefined,
//         },
//       ].filter(Boolean),
//     };
//   };

//   const chartOptions = {
//     responsive: true,
//     scales: chartType !== 'pie' ? {
//       x: {
//         ticks: {
//           font: { size: 12 },
//         },
//         grid: { display: false },
//       },
//       y: {
//         ticks: {
//           font: { size: 12 },
//           callback: (value: any) => `$${value.toFixed(2)}`,
//         },
//       },
//     } : undefined,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context: any) {
//             return `$${context.raw.toFixed(2)}`;
//           },
//         },
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   const ChartComponent = {
//     line: Line,
//     bar: Bar,
//     pie: Pie,
//   }[chartType];

//   if (!ChartComponent) {
//     return <div>Error: Invalid chart type</div>;
//   }

//   const chartTypeIcons = {
//     line: <LineChart className="w-5 h-5" />,
//     bar: <BarChart3 className="w-5 h-5" />,
//     pie: <PieChart className="w-5 h-5" />,
//   };

//   return (
//     <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Chart Type Selection */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="text-sm font-medium text-gray-500 mb-3">Chart Type</h3>
//           <div className="grid grid-cols-3 gap-2">
//             {(['line', 'bar', 'pie'] as ChartType[]).map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setChartType(type)}
//                 className={`flex items-center justify-center p-3 rounded-lg transition-all ${
//                   chartType === type
//                     ? 'bg-indigo-600 text-white shadow-md scale-105'
//                     : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//                 }`}
//               >
//                 <div className="flex flex-col items-center gap-1">
//                   {chartTypeIcons[type]}
//                   <span className="text-xs font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Time Range Selection */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="text-sm font-medium text-gray-500 mb-3">Time Range</h3>
//           <div className="grid grid-cols-4 gap-2">
//             {(['1W', '1M', '3M', '1Y'] as TimeRange[]).map((range) => (
//               <button
//                 key={range}
//                 onClick={() => setTimeRange(range)}
//                 className={`flex items-center justify-center p-3 rounded-lg transition-all ${
//                   timeRange === range
//                     ? 'bg-indigo-600 text-white shadow-md scale-105'
//                     : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//                 }`}
//               >
//                 <div className="flex flex-col items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   <span className="text-xs font-medium">{range}</span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Prediction Controls */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="text-sm font-medium text-gray-500 mb-3">Prediction</h3>
//           <div className="flex flex-col gap-2">
//             <button
//               onClick={() => setShowPrediction(!showPrediction)}
//               className={`flex items-center justify-center p-3 rounded-lg transition-all ${
//                 showPrediction
//                   ? 'bg-green-600 text-white shadow-md'
//                   : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5" />
//                 <span className="font-medium">{showPrediction ? 'Hide Prediction' : 'Show Prediction'}</span>
//               </div>
//             </button>

//             {showPrediction && (
//               <select
//                 value={predictionRange}
//                 onChange={(e) => setPredictionRange(e.target.value as PredictionRange)}
//                 className="w-full p-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="1M">1 Month Prediction</option>
//                 <option value="2M">2 Months Prediction</option>
//                 <option value="3M">3 Months Prediction</option>
//                 <option value="6M">6 Months Prediction</option>
//               </select>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="h-[400px] w-full">
//         {prepareChartData() && <ChartComponent data={prepareChartData()} options={chartOptions} />}
//       </div>

//       {showPrediction && chartType !== 'pie' && (
//         <div className="flex items-center justify-center space-x-6 text-sm bg-gray-50 p-3 rounded-lg">
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-0.5 bg-indigo-600"></div>
//             <span className="text-gray-600">Historical Price</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-0.5 bg-green-500 border-dashed"></div>
//             <span className="text-gray-600">Predicted Price</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StockChart;


// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// // Register necessary components for Chart.js
// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// interface StockChartProps {
//   company: {
//     symbol: string;
//   };
//   showPrediction: boolean;
// }

// type TimeRange = '1W' | '1M' | '1Y';

// function StockChart({ company, showPrediction }: StockChartProps) {
//   const [timeRange, setTimeRange] = useState<TimeRange>('1M');

//   // Mock data generator based on time range
//   const generateMockData = (range: TimeRange) => {
//     const today = new Date();
//     const labels = [];
//     const data = { price: [], prediction: [] };

//     let days;
    
//     switch (range) {
//       case '1W':
//         days = 7;
//         break;
//       case '1M':
//         days = 30;
//         break;
//       case '1Y':
//         days = 365;
//         break;
//     }

//     let basePrice = 100;
//     for (let i = days; i >= 0; i--) {
//       const date = new Date(today);
//       date.setDate(date.getDate() - i);
//       labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
//       basePrice = basePrice + (Math.random() - 0.5) * 5;
//       data.price.push(basePrice.toFixed(2));

//       if (showPrediction && i < 5) {
//         // Predictive data for the last 5 points
//         data.prediction.push((basePrice * (1 + Math.random() * 0.1)).toFixed(2));
//       } else {
//         data.prediction.push(null); // No prediction for earlier points
//       }
//     }
//     return { labels, data };
//   };

//   const { labels, data } = generateMockData(timeRange);

//   // Chart.js data structure
//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: 'Historical Price',
//         data: data.price,
//         borderColor: '#4f46e5',
//         backgroundColor: 'transparent',
//         borderWidth: 2,
//         pointRadius: 0,
//         fill: false,
//       },
//       showPrediction && {
//         label: 'Predicted Price',
//         data: data.prediction,
//         borderColor: '#10b981',
//         backgroundColor: 'transparent',
//         borderWidth: 2,
//         pointRadius: 0,
//         borderDash: [5, 5],
//         fill: false,
//       },
//     ].filter(Boolean), // Remove undefined predictions when not showing
//   };

//   // Chart.js options
//   const chartOptions = {
//     responsive: true,
//     scales: {
//       x: {
//         ticks: {
//           font: { size: 12 },
//         },
//         grid: { display: false },
//       },
//       y: {
//         ticks: {
//           font: { size: 12 },
//           callback: (value: any) => `$${value}`,
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem: any) {
//             return `$${tooltipItem.raw} Price`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex space-x-2">
//         {(['1W', '1M', '1Y'] as TimeRange[]).map((range) => (
//           <button
//             key={range}
//             onClick={() => setTimeRange(range)}
//             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               timeRange === range
//                 ? 'bg-indigo-600 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {range}
//           </button>
//         ))}
//       </div>

//       <div className="h-[400px] w-full">
//         <Line data={chartData} options={chartOptions} />
//       </div>

//       {showPrediction && (
//         <div className="flex items-center space-x-4 text-sm">
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-0.5 bg-indigo-600"></div>
//             <span>Historical Price</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-0.5 bg-green-500 border-dashed"></div>
//             <span>Predicted Price</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StockChart;


//working chart pie in row
// import React, { useState, useEffect } from 'react';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import { format, addDays } from 'date-fns';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   ArcElement,
// } from 'chart.js';

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface StockChartProps {
//   company: {
//     symbol: string;
//   };
// }

// type ChartType = 'line' | 'bar' | 'pie';
// type TimeRange = '1W' | '1M' | '3M' | '1Y';
// type PredictionRange = '1M' | '2M' | '3M' | '6M';

// function StockChart({ company }: StockChartProps) {
//   const [timeRange, setTimeRange] = useState<TimeRange>('1M');
//   const [chartType, setChartType] = useState<ChartType>('line');
//   const [showPrediction, setShowPrediction] = useState(false);
//   const [predictionRange, setPredictionRange] = useState<PredictionRange>('1M');
//   const [historicalData, setHistoricalData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const backend_url = import.meta.env.VITE_BACKEND_FLASK_URL;

//   useEffect(() => {
//     const fetchHistoricalData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${backend_url}/stocks/${company.symbol.toLowerCase()}/historical/${timeRange}`);
//         const data = await response.json();
        
//         // Convert the object into an array
//         const formattedData = Object.entries(data).map(([date, stockData]) => ({
//           date,
//           close: parseFloat(stockData['4. close']), // Parse as number
//           high: parseFloat(stockData['2. high']),
//           low: parseFloat(stockData['3. low']),
//           open: parseFloat(stockData['1. open']),
//           volume: parseInt(stockData['5. volume']),
//         }));
        
//         console.log('Formatted data:', formattedData); // Log the transformed data
//         setHistoricalData(formattedData);
//       } catch (error) {
//         console.error('Error fetching historical data:', error);
//       }
//       setLoading(false);
//     };

//     fetchHistoricalData();
//   }, [company.symbol, timeRange]);

//   const generatePredictionData = (historicalPrices: number[]) => {
//     const lastPrice = historicalPrices[historicalPrices.length - 1];
//     const predictionDays = {
//       '1M': 30,
//       '2M': 60,
//       '3M': 90,
//       '6M': 180,
//     }[predictionRange];

//     return Array.from({ length: predictionDays }, (_, i) => {
//       const trend = Math.sin(i / 10) * 0.02; // Create a sine wave pattern
//       const randomFactor = (Math.random() - 0.5) * 0.01; // Add some randomness
//       return lastPrice * (1 + trend + randomFactor);
//     });
//   };

//   const prepareChartData = () => {
//     if (!historicalData || historicalData.length === 0) return null;

//     const dates = historicalData.map(d => format(new Date(d.date), 'MMM d'));
//     const prices = historicalData.map(d => d.close);

//     const predictionDates = showPrediction
//       ? Array.from({ length: parseInt(predictionRange) * 30 }, (_, i) =>
//           format(addDays(new Date(historicalData[historicalData.length - 1].date), i + 1), 'MMM d')
//         )
//       : [];

//     const predictionPrices = showPrediction ? generatePredictionData(prices) : [];

//     if (chartType === 'pie') {
//       return {
//         labels: ['Current Price', 'Day High', 'Day Low'],
//         datasets: [
//           {
//             data: [
//               prices[prices.length - 1],
//               Math.max(...prices),
//               Math.min(...prices),
//             ],
//             backgroundColor: ['#4f46e5', '#10b981', '#ef4444'],
//           },
//         ],
//       };
//     }

//     return {
//       labels: [...dates, ...(showPrediction ? predictionDates : [])],
//       datasets: [
//         {
//           label: 'Historical Price',
//           data: prices,
//           borderColor: '#4f46e5',
//           backgroundColor: chartType === 'bar' ? 'rgba(79, 70, 229, 0.5)' : 'transparent',
//           borderWidth: 2,
//           pointRadius: chartType === 'line' ? 0 : undefined,
//         },
//         showPrediction && {
//           label: 'Predicted Price',
//           data: [...Array(dates.length).fill(null), ...predictionPrices],
//           borderColor: '#10b981',
//           backgroundColor: chartType === 'bar' ? 'rgba(16, 185, 129, 0.5)' : 'transparent',
//           borderWidth: 2,
//           borderDash: [5, 5],
//           pointRadius: chartType === 'line' ? 0 : undefined,
//         },
//       ].filter(Boolean),
//     };
//   };

//   const chartOptions = {
//     responsive: true,
//     scales: chartType !== 'pie' ? {
//       x: {
//         ticks: {
//           font: { size: 12 },
//         },
//         grid: { display: false },
//       },
//       y: {
//         ticks: {
//           font: { size: 12 },
//           callback: (value: any) => `$${value.toFixed(2)}`,
//         },
//       },
//     } : undefined,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context: any) {
//             return `$${context.raw.toFixed(2)}`;
//           },
//         },
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   const ChartComponent = {
//     line: Line,
//     bar: Bar,
//     pie: Pie,
//   }[chartType];

//   // Ensure ChartComponent is valid
//   if (!ChartComponent) {
//     return <div>Error: Invalid chart type</div>;
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap gap-4">
//         <div className="space-x-2">
//           {(['1W', '1M', '3M', '1Y'] as TimeRange[]).map((range) => (
//             <button
//               key={range}
//               onClick={() => setTimeRange(range)}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 timeRange === range
//                   ? 'bg-indigo-600 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               {range}
//             </button>
//           ))}
//         </div>

//         <div className="space-x-2">
//           {(['line', 'bar', 'pie'] as ChartType[]).map((type) => (
//             <button
//               key={type}
//               onClick={() => setChartType(type)}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 chartType === type
//                   ? 'bg-indigo-600 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => setShowPrediction(!showPrediction)}
//             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//               showPrediction
//                 ? 'bg-green-600 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {showPrediction ? 'Hide Prediction' : 'Show Prediction'}
//           </button>

//           {showPrediction && (
//             <select
//               value={predictionRange}
//               onChange={(e) => setPredictionRange(e.target.value as PredictionRange)}
//               className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-gray-300"
//             >
//               <option value="1M">1 Month</option>
//               <option value="2M">2 Months</option>
//               <option value="3M">3 Months</option>
//               <option value="6M">6 Months</option>
//             </select>
//           )}
//         </div>
//       </div>

//       <div className="h-[400px] w-full">
//         {prepareChartData() && <ChartComponent data={prepareChartData()} options={chartOptions} />}
//       </div>

//       {showPrediction && chartType !== 'pie' && (
//         <div className="flex items-center space-x-4 text-sm">
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-0.5 bg-indigo-600"></div>
//             <span>Historical Price</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-0.5 bg-green-500 border-dashed"></div>
//             <span>Predicted Price</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StockChart;

// //working without integrate 
// import React, { useState, useEffect } from 'react';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import { format, addDays } from 'date-fns';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   ArcElement,
// } from 'chart.js';
// import { BarChart3, LineChart, PieChart, Calendar, TrendingUp } from 'lucide-react';

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface StockChartProps {
//   company: {
//     symbol: string;
//   };
// }

// type ChartType = 'line' | 'bar' | 'pie';
// type TimeRange = '1W' | '1M' | '3M' | '1Y';
// type PredictionRange = '1M' | '2M' | '3M' | '6M';

// function StockChart({ company }: StockChartProps) {
//   const [timeRange, setTimeRange] = useState<TimeRange>('1M');
//   const [chartType, setChartType] = useState<ChartType>('line');
//   const [showPrediction, setShowPrediction] = useState(false);
//   const [predictionRange, setPredictionRange] = useState<PredictionRange>('1M');
//   const [historicalData, setHistoricalData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const backend_url = import.meta.env.VITE_BACKEND_FLASK_URL;

//   useEffect(() => {
//     const fetchHistoricalData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${backend_url}/stocks/${company.symbol.toLowerCase()}/historical/${timeRange}`);
//         const data = await response.json();
        
//         // Convert the object into an array
//         const formattedData = Object.entries(data).map(([date, stockData]) => ({
//           date,
//           close: parseFloat(stockData['4. close']), // Parse as number
//           high: parseFloat(stockData['2. high']),
//           low: parseFloat(stockData['3. low']),
//           open: parseFloat(stockData['1. open']),
//           volume: parseInt(stockData['5. volume']),
//         }));
        
//         console.log('Formatted data:', formattedData);
//         setHistoricalData(formattedData);
//       } catch (error) {
//         console.error('Error fetching historical data:', error);
//       }
//       setLoading(false);
//     };

//     fetchHistoricalData();
//   }, [company.symbol, timeRange]);

//   const generatePredictionData = (historicalPrices: number[]) => {
//     const lastPrice = historicalPrices[historicalPrices.length - 1];
//     const predictionDays = {
//       '1M': 30,
//       '2M': 60,
//       '3M': 90,
//       '6M': 180,
//     }[predictionRange];

//     return Array.from({ length: predictionDays }, (_, i) => {
//       const trend = Math.sin(i / 10) * 0.02;
//       const randomFactor = (Math.random() - 0.5) * 0.01;
//       return lastPrice * (1 + trend + randomFactor);
//     });
//   };

//   const prepareChartData = () => {
//     if (!historicalData || historicalData.length === 0) return null;

//     const dates = historicalData.map(d => format(new Date(d.date), 'MMM d'));
//     const prices = historicalData.map(d => d.close);

//     const predictionDates = showPrediction
//       ? Array.from({ length: parseInt(predictionRange) * 30 }, (_, i) =>
//           format(addDays(new Date(historicalData[historicalData.length - 1].date), i + 1), 'MMM d')
//         )
//       : [];

//     const predictionPrices = showPrediction ? generatePredictionData(prices) : [];

//     if (chartType === 'pie') {
//       return {
//         labels: ['Current Price', 'Day High', 'Day Low'],
//         datasets: [
//           {
//             data: [
//               prices[prices.length - 1],
//               Math.max(...prices),
//               Math.min(...prices),
//             ],
//             backgroundColor: ['#4f46e5', '#10b981', '#ef4444'],
//           },
//         ],
//       };
//     }

//     return {
//       labels: [...dates, ...(showPrediction ? predictionDates : [])],
//       datasets: [
//         {
//           label: 'Historical Price',
//           data: prices,
//           borderColor: '#4f46e5',
//           backgroundColor: chartType === 'bar' ? 'rgba(79, 70, 229, 0.5)' : 'transparent',
//           borderWidth: 2,
//           pointRadius: chartType === 'line' ? 0 : undefined,
//         },
//         showPrediction && {
//           label: 'Predicted Price',
//           data: [...Array(dates.length).fill(null), ...predictionPrices],
//           borderColor: '#10b981',
//           backgroundColor: chartType === 'bar' ? 'rgba(16, 185, 129, 0.5)' : 'transparent',
//           borderWidth: 2,
//           borderDash: [5, 5],
//           pointRadius: chartType === 'line' ? 0 : undefined,
//         },
//       ].filter(Boolean),
//     };
//   };

//   const chartOptions = {
//     responsive: true,
//     scales: chartType !== 'pie' ? {
//       x: {
//         ticks: {
//           font: { size: 12 },
//         },
//         grid: { display: false },
//       },
//       y: {
//         ticks: {
//           font: { size: 12 },
//           callback: (value: any) => `$${value.toFixed(2)}`,
//         },
//       },
//     } : undefined,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       tooltip: {
//         callbacks: {
//           label: function(context: any) {
//             return `$${context.raw.toFixed(2)}`;
//           },
//         },
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   const ChartComponent = {
//     line: Line,
//     bar: Bar,
//     pie: Pie,
//   }[chartType];

//   if (!ChartComponent) {
//     return <div>Error: Invalid chart type</div>;
//   }

//   const chartTypeIcons = {
//     line: <LineChart className="w-5 h-5" />,
//     bar: <BarChart3 className="w-5 h-5" />,
//     pie: <PieChart className="w-5 h-5" />,
//   };

//   return (
//     <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Chart Type Selection */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="text-sm font-medium text-gray-500 mb-3">Chart Type</h3>
//           <div className="grid grid-cols-3 gap-2">
//             {(['line', 'bar', 'pie'] as ChartType[]).map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setChartType(type)}
//                 className={`flex items-center justify-center p-3 rounded-lg transition-all ${
//                   chartType === type
//                     ? 'bg-indigo-600 text-white shadow-md scale-105'
//                     : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//                 }`}
//               >
//                 <div className="flex flex-col items-center gap-1">
//                   {chartTypeIcons[type]}
//                   <span className="text-xs font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Time Range Selection */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="text-sm font-medium text-gray-500 mb-3">Time Range</h3>
//           <div className="grid grid-cols-4 gap-2">
//             {(['1W', '1M', '3M', '1Y'] as TimeRange[]).map((range) => (
//               <button
//                 key={range}
//                 onClick={() => setTimeRange(range)}
//                 className={`flex items-center justify-center p-3 rounded-lg transition-all ${
//                   timeRange === range
//                     ? 'bg-indigo-600 text-white shadow-md scale-105'
//                     : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//                 }`}
//               >
//                 <div className="flex flex-col items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   <span className="text-xs font-medium">{range}</span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Prediction Controls */}
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="text-sm font-medium text-gray-500 mb-3">Prediction</h3>
//           <div className="flex flex-col gap-2">
//             <button
//               onClick={() => setShowPrediction(!showPrediction)}
//               className={`flex items-center justify-center p-3 rounded-lg transition-all ${
//                 showPrediction
//                   ? 'bg-green-600 text-white shadow-md'
//                   : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5" />
//                 <span className="font-medium">{showPrediction ? 'Hide Prediction' : 'Show Prediction'}</span>
//               </div>
//             </button>

//             {showPrediction && (
//               <select
//                 value={predictionRange}
//                 onChange={(e) => setPredictionRange(e.target.value as PredictionRange)}
//                 className="w-full p-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="1M">1 Month Prediction</option>
//                 <option value="2M">2 Months Prediction</option>
//                 <option value="3M">3 Months Prediction</option>
//                 <option value="6M">6 Months Prediction</option>
//               </select>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="h-[400px] w-full">
//         {prepareChartData() && <ChartComponent data={prepareChartData()} options={chartOptions} />}
//       </div>

//       {showPrediction && chartType !== 'pie' && (
//         <div className="flex items-center justify-center space-x-6 text-sm bg-gray-50 p-3 rounded-lg">
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-0.5 bg-indigo-600"></div>
//             <span className="text-gray-600">Historical Price</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-0.5 bg-green-500 border-dashed"></div>
//             <span className="text-gray-600">Predicted Price</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StockChart;

