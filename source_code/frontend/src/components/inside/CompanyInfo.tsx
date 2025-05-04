import React, { useState, useEffect } from 'react';
import { Building2, TrendingUp, TrendingDown, Heart, HeartOff } from 'lucide-react';
// import { useStore } from '../store/useStore'; // Import your Zustand store
import { useStore } from '@/store/useStore';

interface CompanyInfoProps {
  company: {
    name: string;
    symbol: string;
  };
  onAddToWishlist: (company: any) => void;
  onRemoveFromWishlist: (symbol: string) => void;
  isInWishlist: boolean;
}

function CompanyInfo({ company, onAddToWishlist, onRemoveFromWishlist, isInWishlist }: CompanyInfoProps) {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true); // New loading state
  const { companyData, setCompanyData } = useStore(); // Access Zustand state

  const backend_url = import.meta.env.VITE_BACKEND_FLASK_URL; // Make sure to set your backend URL in .env

  const isIndianExchange = (symbol: string) => {
    return symbol.endsWith('.BSE') || symbol.endsWith('.BO') || symbol.endsWith('.NSE') || symbol.endsWith('.NS');
  };
  

  // Fetch company data from your backend
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true); // Set loading to true before starting the fetch
        const response = await fetch(`${backend_url}/stocks/${company.symbol.toLowerCase()}/twodays`);
        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          // Get the latest two dates
          const timeSeries = data;
          const latestDate = Object.keys(timeSeries)[0];
          const latestData = timeSeries[latestDate];

          const openPrice = parseFloat(latestData['1. open']);
          const closePrice = parseFloat(latestData['4. close']);
          const change = ((closePrice - openPrice) / openPrice) * 100;
          const volume = latestData['5. volume'];

          const companyInfo = {
            open: openPrice,
            close: closePrice,
            change: change.toFixed(2), // Format the change percentage
            volume,
            latestDate, // Optionally, store the date of the latest data
          };

          setCompanyData(companyInfo); // Save data in Zustand store
        } else {
          setError('Error fetching data from API');
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setIsLoading(false); // Set loading to false when the fetch is complete
      }
    };

    fetchCompanyData();
  }, [company.symbol, backend_url, setCompanyData]);

  if (error) {
    return <div>{error}</div>;
  }

  // Skeleton loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse" />
            <div>
              <div className="h-6 w-48 bg-gray-300 rounded-full animate-pulse" />
              <div className="h-4 w-32 mt-2 bg-gray-300 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg animate-pulse">
              <div className="h-4 w-16 bg-gray-300 rounded-full mb-2" />
              <div className="h-6 w-24 bg-gray-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Building2 className="h-8 w-8 text-indigo-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-700">{company.name}</h2>
            <p className="text-gray-500">{company.symbol}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {/* <span className="text-2xl font-bold">${companyData.close}</span> */}
            <span className="text-2xl font-bold text-gray-700">

            {isIndianExchange(company.symbol) ? `₹ ${companyData.close}` : `$${companyData.close}`}
            </span>

            <div className={`flex items-center ${companyData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {companyData.change >= 0 ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
              <span className="ml-1">{Math.abs(companyData.change)}%</span>
            </div>
          </div>
          <button
            onClick={() => {
              if (isInWishlist) {
                onRemoveFromWishlist(company.symbol);
              } else {
                onAddToWishlist(company);
              }
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isInWishlist ? (
              <HeartOff className="h-6 w-6 text-red-600" />
            ) : (
              <Heart className="h-6 w-6 text-gray-400 hover:text-red-600" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Open Price</div>
          {/* <div className="text-lg font-semibold">${companyData.open}</div> */}
          <div className="text-lg font-semibold text-gray-800">
          {isIndianExchange(company.symbol) ? `₹ ${companyData.open}` : `$${companyData.open}`}
          </div>

        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Close Price</div>
          {/* <div className="text-lg font-semibold">${companyData.close}</div> */}
          <div className="text-lg font-semibold text-gray-800">
          {isIndianExchange(company.symbol) ? `₹ ${companyData.close}` : `$${companyData.close}`}
          </div>

        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">24h Change</div>
          <div className={`text-lg font-semibold ${companyData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(companyData.change)}%
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Volume</div>
          <div className="text-lg font-semibold text-gray-800">{companyData.volume}</div>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;
