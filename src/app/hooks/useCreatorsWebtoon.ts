import { useQuery } from '@tanstack/react-query';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator/index';

export const useCreatorsWebtoon = (status: 'IN_SERIES' | 'FINISH' | 'NEW') => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['creatorsWebtoon', status],
    queryFn: () => {
      return fetchCreatorWebtoon.getCreatorsWebtoons({
        query: { status, page: 1, size: 10 },
      });
    },
    enabled: !!localStorage.getItem('accessToken'),
  });

  return {
    data: data?.content.result || [],
    total: data?.content.totalElements || 0,
    isLoading,
    isError,
    error,
  };
};
