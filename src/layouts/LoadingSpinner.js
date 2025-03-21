import React from 'react'

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    <p className="ml-4 text-gray-700">Loading...</p>
  </div>
)

export default LoadingSpinner
