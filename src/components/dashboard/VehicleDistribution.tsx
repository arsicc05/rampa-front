'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VehicleDistributionProps {
  distribution: Record<string, number>;
  mostCommon: string;
}

export const VehicleDistribution: React.FC<VehicleDistributionProps> = ({
  distribution,
  mostCommon,
}) => {
  const total = Object.values(distribution).reduce(
    (sum, count) => sum + count,
    0
  );

  const getVehicleTypeDisplayName = (type: string) => {
    const typeMap: Record<string, string> = {
      KAMION: 'Kamion',
      AUTOMOBIL: 'Automobil',
      AUTOBUS: 'Autobus',
      MOTOCIKL: 'Motocikl',
    };
    return typeMap[type] || type;
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'KAMION':
        return '🚛';
      case 'AUTOMOBIL':
        return '🚗';
      case 'AUTOBUS':
        return '🚌';
      case 'MOTOCIKL':
        return '🏍️';
      default:
        return '🚗';
    }
  };

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-indigo-500',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Distribution By Car Types
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Most Common: {getVehicleTypeDisplayName(mostCommon)}{' '}
          {getVehicleIcon(mostCommon)}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(distribution).map(([type, count], index) => {
          const percentage = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={type} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getVehicleIcon(type)}</span>
                  <span className="text-sm font-medium">
                    {getVehicleTypeDisplayName(type)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold">{count}</span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
        {total === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No vehicle data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
