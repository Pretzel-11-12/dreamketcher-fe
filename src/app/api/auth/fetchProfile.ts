import { fetchAPI } from '..';
import { User } from '@/model/User';

export const fetchProfile = async ({}: User) => {
  return await fetchAPI({
    method: 'GET',
    endpoint: '/member/me',
  });
};
