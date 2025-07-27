'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/contexts/UserContext';
import { getDailyReport } from '@/lib/dashboard';
import { DailyReportTable } from '@/components/dashboard/DailyReportTable';
import { DailyActivityChart } from '@/components/dashboard/DailyActivityChart';

function Page() {
  const { user } = useUser();
  const [selectedDays, setSelectedDays] = useState(7);

  const {
    data: dailyData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['daily-report', selectedDays],
    queryFn: () => getDailyReport(selectedDays),
    staleTime: 60000,
  });

  const handleDaysChange = (days: number) => {
    setSelectedDays(days);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Daily Report
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
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Daily Report
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome, {user?.name}! Overview of daily activities at the ramp.
          </p>
        </div>

        <div className="space-y-6">
          <DailyActivityChart data={dailyData} />

          <DailyReportTable
            data={dailyData}
            isLoading={isLoading}
            selectedDays={selectedDays}
            onDaysChange={handleDaysChange}
            onRefresh={handleRefresh}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
