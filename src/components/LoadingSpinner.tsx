import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-moving-blue" aria-label="Ładowanie"></div>
        <p className="text-gray-700">Ładowanie...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 