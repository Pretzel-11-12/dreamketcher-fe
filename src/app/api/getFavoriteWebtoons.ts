import { BeforeFavoriteWebtoon } from '@/model/Webtoon';
import { fetchAPI } from '.';

export const getFavoriteWebtoons = async (): Promise<BeforeFavoriteWebtoon[]> => {
  return await fetchAPI({
    method: 'GET',
    endpoint: '/member/favorite',
  });
};
