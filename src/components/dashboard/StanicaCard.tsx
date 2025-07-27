'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StanicaCardProps {
  stanicaId: number;
  stanicaNaziv: string;
  zaradaEur: number;
  zaradaRsd: number;
  vehiclesPassed: number;
}

export const StanicaCard: React.FC<StanicaCardProps> = ({
  stanicaId,
  stanicaNaziv,
  zaradaEur,
  zaradaRsd,
  vehiclesPassed,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          ID: {stanicaId}
          <br />
          Stanica: {stanicaNaziv}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
          {zaradaEur ? zaradaEur.toLocaleString() : '0'} EUR
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
          {zaradaRsd ? zaradaRsd.toLocaleString() : '0'} RSD
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Vehicles Passed:{' '}
          {vehiclesPassed ? vehiclesPassed.toLocaleString() : '0'}
        </p>
      </CardContent>
    </Card>
  );
};
