'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DailyReportData } from '@/lib/dashboard';

interface DailyReportTableProps {
  data: DailyReportData[];
  isLoading: boolean;
  selectedDays: number;
  onDaysChange: (days: number) => void;
  onRefresh: () => void;
}

export const DailyReportTable: React.FC<DailyReportTableProps> = ({
  data,
  isLoading,
  selectedDays,
  onDaysChange,
  onRefresh,
}) => {
  const dayOptions = [2, 7, 14, 30];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sr-RS', { weekday: 'long' });
  };

  const getTotalVehiclesEntered = () => {
    return data.reduce((sum, day) => sum + day.vehiclesEntered, 0);
  };

  const getTotalVehiclesExited = () => {
    return data.reduce((sum, day) => sum + day.vehiclesExited, 0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-xl font-semibold">
              Daily Activity Report
            </CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Overview of vehicle entries and exits by day
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-1">
              {dayOptions.map(days => (
                <Button
                  key={days}
                  size="sm"
                  variant={selectedDays === days ? 'default' : 'outline'}
                  onClick={() => onDaysChange(days)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {days}d
                </Button>
              ))}
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center space-x-1"
            >
              <svg
                className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Loading...
              </span>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No data available for the selected period
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Summary of Entries
                    </p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {getTotalVehiclesEntered()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 13l-5 5m0 0l-5-5m5 5V6"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Summary of Exits
                    </p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {getTotalVehiclesExited()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                      Day
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                      Vehicles Entered
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                      Vehicles Exited
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(day => {
                    const difference = day.vehiclesEntered - day.vehiclesExited;
                    const isToday =
                      new Date(day.date).toDateString() ===
                      new Date().toDateString();

                    return (
                      <tr
                        key={day.date}
                        className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                          isToday ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            {isToday && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                            <span
                              className={`font-medium ${isToday ? 'text-blue-700 dark:text-blue-300' : ''}`}
                            >
                              {formatDate(day.date)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400 capitalize">
                          {getDayName(day.date)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                            {day.vehiclesEntered}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                            {day.vehiclesExited}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              difference > 0
                                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                                : difference < 0
                                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            {difference > 0 ? `+${difference}` : difference}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
