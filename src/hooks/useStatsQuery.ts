import { useQuery } from '@tanstack/react-query';
import { statsAPI } from '@/services/api';

export const useStatsQuery = () => {
  return useQuery({
    queryKey: ['stats', 'overall'],
    queryFn: () => statsAPI.getOverall(),
    staleTime: 1000 * 30, // 30 seconds - frequent updates for real-time feel
    gcTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 30, // Poll every 30 seconds
  });
};

export const useDailyStatsQuery = () => {
  return useQuery({
    queryKey: ['stats', 'daily'],
    queryFn: () => statsAPI.getDaily(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const usePostStatsQuery = () => {
  return useQuery({
    queryKey: ['stats', 'posts'],
    queryFn: () => statsAPI.getPostStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
