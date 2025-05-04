import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

interface SearchBarProps {
  onCompanySelect: (company: any) => void;
}

function SearchBar({ onCompanySelect }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]); // Always initialize as an empty array
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fetch data from the API when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setCompanies([]); // Clear companies if search term is empty
      return;
    }

    // If there's a previous timeout, clear it before setting a new one
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      const fetchCompanies = async () => {
        try {
        
          const response = await axios.get(url);
          const data = response.data.bestMatches || []; // Fallback to empty array if no data
          setCompanies(data);
        } catch (error) {
          console.error('Error fetching company data:', error);
          setCompanies([]); // Fallback to empty array if there's an error
        }
      };

      fetchCompanies();
    }, 5000); // 500 ms debounce time

    // Store the timeout ID so we can clear it if necessary
    setDebounceTimeout(newTimeout);

    // Cleanup timeout on component unmount
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [searchTerm]); // Dependency on searchTerm

  const filteredCompanies = companies.filter(
    (company) =>
      company['2. name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      company['1. symbol'].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-900" />
        <input
          type="text"
          placeholder="Search for a company..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-gray-900"
        />
      </div>

      {showResults && searchTerm && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 text-gray-900">
          {filteredCompanies.map((company) => (
            <div
              key={company['1. symbol']}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                // Transform the API data into the expected format
                const selectedCompany = {
                  name: company['2. name'],
                  symbol: company['1. symbol'],
                };
                onCompanySelect(selectedCompany);
                setSearchTerm('');
                setShowResults(false);
              }}
            >
              <div className="font-medium">{company['2. name']}</div>
              <div className="text-sm text-gray-500">{company['1. symbol']}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;