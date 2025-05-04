// UserProfilePage.tsx
import React from 'react';
import { UserProfile } from '@clerk/clerk-react';
import { TrendingUp } from 'lucide-react'; // Import TrendingUp icon for the header

const UserProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <UserProfile />
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
