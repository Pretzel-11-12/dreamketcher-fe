import { fetchAPI } from '..';
import { User } from '@/model/User';

export const fetchProfile = async (): Promise<User> => {
  return await fetchAPI({
    method: 'GET',
    endpoint: '/member/me',
  });
};
