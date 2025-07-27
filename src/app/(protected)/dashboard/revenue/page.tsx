'use client';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { getRevenueReport } from '@/lib/dashboard';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

function Page() {
  const { user } = useUser();

  const {
    data: revenueData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['revenue-report'],
    queryFn: () => getRevenueReport(),
    staleTime: 60000,
  });

  const handleRefresh = () => {
    refetch();
  };
  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Revenue Report
            </h1>
          </div>

          <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-700 dark:text-red-400">
                Error Loading Data
              </span>
            </div>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Revenue Report
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome, {user?.name}! Overview of revenue
          </p>
        </div>
        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 flex-col gap-5 ">
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Total Revenue (EUR): {revenueData?.totalRevenueEur.toFixed(2)}
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Total Revenue (RSD): {revenueData?.totalRevenueRsd.toFixed(2)}
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Top Earning Station: {revenueData?.topEarningStanicaNaziv} (
                {revenueData?.topEarningAmount.toFixed(2)} EUR)
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Page;
