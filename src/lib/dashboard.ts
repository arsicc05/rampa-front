import { api } from './api';

export interface DashboardOverview {
  totalVehiclesProcessed: number;
  vehiclesCurrentlyInSystem: number;
  vehiclesExited: number;
  totalEarningsEur: number;
  totalEarningsRsd: number;
  vehicleTypeDistribution: Record<string, number>;
  mostCommonVehicleType: string;
}
export interface DashboardStanica {
  stanicaId: number;
  stanicaNaziv: string;
  zaradaEur: number;
  zaradaRsd: number;
  vehiclesPassed: number;
}

export interface DailyReportData {
  date: string;
  vehiclesEntered: number;
  vehiclesExited: number;
}

export interface Revenue {
  totalRevenueEur: number;
  totalRevenueRsd: number;
  topEarningStanicaId: number;
  topEarningStanicaNaziv: string;
  topEarningAmount: number;
}

export const getDashboardOverview = async (): Promise<DashboardOverview> => {
  try {
    const response = await api.get('/dashboard/overview');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    throw new Error('Failed to fetch dashboard data');
  }
};

export const getDashboardStanicas = async (): Promise<DashboardStanica[]> => {
  try {
    const response = await api.get('/dashboard/stanicas');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stanicas:', error);
    throw new Error('Failed to fetch dashboard data');
  }
};

export const getDailyReport = async (
  days?: number
): Promise<DailyReportData[]> => {
  try {
    const params = days ? { days } : {};
    const response = await api.get('/dashboard/daily', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching daily report:', error);
    throw new Error('Failed to fetch daily report data');
  }
};

export const getRevenueReport = async (): Promise<Revenue> => {
  try {
    const response = await api.get('/dashboard/revenue');
    return response.data;
  } catch (error) {
    console.error('Error fetching revenue report:', error);
    throw new Error('Failed to fetch revenue report data');
  }
};
