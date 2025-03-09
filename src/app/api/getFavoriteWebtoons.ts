import { FavoriteWebtoon } from '@/model/Webtoon';
import { fetchAPI } from '.';

export const getFavoriteWebtoons = async (): Promise<FavoriteWebtoon[]> => {
  return await fetchAPI({
    method: 'GET',
    endpoint: '/member/favorite',
  });
};
