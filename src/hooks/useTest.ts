'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useTest() {
  return useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      const res = await api.get('/test');
      return res.data;
    },
  });
}
