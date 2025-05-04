import React from 'react';

const LoaderModal = ({ message = "Loading...", show = false }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="flex gap-4 items-center justify-center p-6 bg-white rounded-xl shadow-md">
        <svg
          className="animate-spin h-8 w-8 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v5a5 5 0 01-5 5H4z"
          ></path>
        </svg>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoaderModal;
