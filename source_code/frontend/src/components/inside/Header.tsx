import React from 'react';
import { TrendingUp, ArrowLeft, LogOut } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface HeaderProps {
  onSignOut: () => void;
  selectedCompany: any;
  setSelectedCompany: (company: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onSignOut, selectedCompany, setSelectedCompany }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleBackToOverview = () => {
    setSelectedCompany(null); // Clear the selected company state
    navigate('/home'); // Navigate to the overview page
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-9xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">StockPredict</h1>
          </div>
          <div className="flex items-center space-x-6">
            {selectedCompany && (
              <button
                onClick={handleBackToOverview} // Use the handleBackToOverview function
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Overview</span>
              </button>
            )}
            <div className="flex items-center space-x-4">
              <UserButton 
                appearance={{ 
                  elements: { 
                    userButton: 'text-sm text-gray-600 hover:text-indigo-600 transition-colors' 
                  } 
                }} 
              />
              <button
                onClick={onSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5"  />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
