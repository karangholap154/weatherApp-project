import React from 'react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
      <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
      <div className="w-40 h-6 bg-gray-300 rounded-md"></div>
      <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
    </div>
  );
}
