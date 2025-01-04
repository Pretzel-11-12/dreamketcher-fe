import { useQuery } from '@tanstack/react-query';
import { getFavoriteWebtoons } from '@/app/api/getFavoriteWebtoons'; // fetch API 함수
import { FavoriteWebtoon } from '../model/FavoriteWebtoon';

export const useFavoriteWebtoons = () => {
  const { data, isLoading, isError, error } = useQuery<FavoriteWebtoon[]>({
    queryKey: ['favoriteWebtoons'],
    queryFn: () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
      return getFavoriteWebtoons(accessToken);
    },
    enabled: !!localStorage.getItem('accessToken'),
  });

  return { data, isLoading, isError, error };
};
