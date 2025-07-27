'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyReportData } from '@/lib/dashboard';

interface DailyActivityChartProps {
  data: DailyReportData[];
}

export const DailyActivityChart: React.FC<DailyActivityChartProps> = ({
  data,
}) => {
  const maxValue = Math.max(
    ...data.map(d => Math.max(d.vehiclesEntered, d.vehiclesExited)),
    1
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate().toString();
  };

  const getBarHeight = (value: number) => {
    return (value / maxValue) * 100;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Daily Activity by Day
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Graphical representation of vehicle entries and exits
        </p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400">
            No data available for the chart
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Vehicles Entered
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Vehicles Exited
                </span>
              </div>
            </div>

            <div className="relative h-40 flex items-end justify-center space-x-1 border-b border-gray-200 dark:border-gray-700">
              {data.map(day => (
                <div
                  key={day.date}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="flex items-end space-x-1 h-32">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-4 bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                        style={{
                          height: `${getBarHeight(day.vehiclesEntered)}%`,
                          minHeight: day.vehiclesEntered > 0 ? '4px' : '0px',
                        }}
                        title={`Vehicles Entered: ${day.vehiclesEntered}`}
                      ></div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className="w-4 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                        style={{
                          height: `${getBarHeight(day.vehiclesExited)}%`,
                          minHeight: day.vehiclesExited > 0 ? '4px' : '0px',
                        }}
                        title={`Vehicles Exited: ${day.vehiclesExited}`}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {formatDate(day.date)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>0</span>
              <span className="text-center">Vehicles</span>
              <span>{maxValue}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
