import { fetchAPI } from '..';
import { User } from '@/model/User';

export const fetchProfile = async () => {
  return await fetchAPI({
    method: 'GET',
    endpoint: '/member/me',
  });
};
