'use client';
import { StanicaCard } from '@/components/dashboard/StanicaCard';
import { useUser } from '@/contexts/UserContext';
import { getDashboardStanicas } from '@/lib/dashboard';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

function Page() {
  const { user } = useUser();

  const {
    data: dashboardStanicasData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-stanicas'],
    queryFn: getDashboardStanicas,
    refetchInterval: 30000,
    staleTime: 10000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome Bacl, {user?.name}!
            </p>
          </div>

          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Loading...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Dashboard
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
                Error loading data
              </span>
            </div>
            <button
              onClick={() => refetch()}
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
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Stanice
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.name}!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStanicasData &&
            dashboardStanicasData.map(stanica => (
              <StanicaCard
                key={stanica.stanicaId}
                stanicaId={stanica.stanicaId}
                stanicaNaziv={stanica.stanicaNaziv}
                zaradaEur={stanica.zaradaEur}
                zaradaRsd={stanica.zaradaRsd}
                vehiclesPassed={stanica.vehiclesPassed}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
