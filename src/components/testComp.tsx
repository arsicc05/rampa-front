'use client';
import { useTest } from '../hooks/useTest';

export default function TestComponent() {
  const { data, isLoading, error } = useTest();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="text-blue-700 dark:text-blue-300 font-medium">
          Loading test data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-950/50 rounded-xl border border-red-200 dark:border-red-800">
        <svg
          className="w-5 h-5 text-red-600 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <span className="text-red-700 dark:text-red-300 font-medium">
          Error loading data!
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl border border-green-200 dark:border-green-800 shadow-sm">
      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Test Hook Response
        </p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {data || 'No data available'}
        </p>
      </div>
    </div>
  );
}
