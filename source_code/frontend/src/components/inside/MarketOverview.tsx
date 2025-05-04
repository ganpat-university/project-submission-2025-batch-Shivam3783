import React, { useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Activity, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { useStore } from '../store/useStore'; // Import your Zustand store
import { useStore } from '@/store/useStore';

interface MarketOverviewProps {
  onSelectCompany: (company: any) => void;
  wishlist: any[];
}

const MARKET_INDICES = [
  { name: 'S&P 500', value: '4,927.25', change: '+0.82%', isPositive: true },
  { name: 'Dow Jones', value: '38,654.42', change: '+0.35%', isPositive: true },
  { name: 'NASDAQ', value: '15,628.95', change: '-0.12%', isPositive: false },
  { name: 'FTSE 100', value: '7,654.32', change: '+0.45%', isPositive: true },
  { name: 'Nikkei 225', value: '28,654.42', change: '-0.25%', isPositive: false },
];

const TOP_COMPANIES = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
];

const API_KEY = 'HOQKF94GO23T8RUQ'; // Replace with your actual API key
const API_URL = 'https://www.alphavantage.co/query';

function MarketOverview({ onSelectCompany, wishlist }: MarketOverviewProps) {
  const { user } = useUser(); // Get the current user
  const backend_url = import.meta.env.VITE_BACKEND_FLASK_URL;

  const indicesContainerRef = useRef<HTMLDivElement>(null);

  const { stockData, setStockData, cachedStockData, setCachedStockData } = useStore();

  const isIndianExchange = (symbol: string) => {
    return symbol.endsWith('.BSE') || symbol.endsWith('.BO') || symbol.endsWith('.NSE') || symbol.endsWith('.NS');
  };

  // Fetch stock data for each company
  useEffect(() => {
    const fetchData = async () => {
      // Check if data is already cached
      if (cachedStockData) {
        setStockData(cachedStockData);
        return;
      }

      // If no cached data, fetch from the backend
      const dataPromises = TOP_COMPANIES.map(async (company) => {
        const response = await fetch(`${backend_url}/stocks/${company.symbol.toLowerCase()}/twodays`);
        const data = await response.json();

        // Assuming the response data has stock data in the correct format
        const timeSeries = data;
        const latestDate = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestDate];

        return {
          ...company,
          open: parseFloat(latestData['1. open']),
          close: parseFloat(latestData['4. close']),
          change: ((parseFloat(latestData['4. close']) - parseFloat(latestData['1. open'])) / parseFloat(latestData['1. open'])) * 100,
          volume: latestData['5. volume'],
        };
      });

      const results = await Promise.all(dataPromises);
      setStockData(results);
      setCachedStockData(results);  // Cache the result in memory
    };

    fetchData();
  }, [cachedStockData, setStockData, setCachedStockData, backend_url]);


  const scrollLeft = () => {
    if (indicesContainerRef.current) {
      indicesContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (indicesContainerRef.current) {
      indicesContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const resetScroll = () => {
    if (indicesContainerRef.current) {
      const container = indicesContainerRef.current;
      if (container.scrollLeft >= container.scrollWidth - container.offsetWidth) {
        container.scrollLeft = 0; // Reset scroll position for infinite loop
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Market Indices */}
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
        >
          <ChevronLeft className="h-5 w-5 text-indigo-600" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
        >
          <ChevronRight className="h-5 w-5 text-indigo-600" />
        </button>
        <div
          ref={indicesContainerRef}
          className="flex overflow-x-hidden space-x-4 p-4"
          style={{ scrollBehavior: 'smooth' }}
          onScroll={resetScroll}
        >
          {[...MARKET_INDICES, ...MARKET_INDICES].map((index, i) => (
            <div key={`${index.name}-${i}`} className="bg-white rounded-lg shadow p-6 min-w-[300px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-900">{index.name}</h3>
                </div>
                <div className={`flex items-center ${index.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {index.isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                </div>
              </div>
              <div className="mt-2">
                {/* <div className="text-2xl font-bold">{index.value}</div> */}
                <div className="text-2xl font-bold text-gray-600">{index.value}</div>

                <div className={`text-sm ${index.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {index.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist */}
      {Array.isArray(wishlist) && wishlist.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Wishlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.map((company) => (
              <div
                key={company.symbol}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectCompany(company)}
              >
                <Building2 className="h-6 w-6 text-indigo-600" />
                <div>
                  <div className="font-medium text-gray-900">{company.name}</div>
                  <div className="text-sm text-gray-500">{company.symbol}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Market Overview */}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center text-gray-900">
            <Globe className="h-5 w-5 mr-2 text-indigo-600" />
            Top Companies
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Open Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Close Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockData === null ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width={150} />
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Skeleton width={80} />
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Skeleton width={80} />
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Skeleton width={60} />
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Skeleton width={100} />
                    </td>
                  </tr>
                ))
              ) : (
                stockData.map((company) => (
                  <tr
                    key={company.symbol}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onSelectCompany(company)}
                  >
                    <td className="px-6 py-4 text-left text-gray-900">{company.name}</td>
                    {/* <td className="px-6 py-4 text-right">${company.open}</td>
                    <td className="px-6 py-4 text-right">${company.close}</td>
                    <td className={`px-6 py-4 text-right ${company.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {company.change.toFixed(3)}%
                    </td> */}
                    <td className="px-6 py-4 text-right text-gray-900">
                      {isIndianExchange(company.symbol) ? `₹ ${company.open}` : `$${company.open}`}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      {isIndianExchange(company.symbol) ? `₹ ${company.close}` : `$${company.close}`}
                    </td>
                    <td className={`px-6 py-4 text-right ${company.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {company.change.toFixed(3)}%
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">{company.volume}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MarketOverview;
