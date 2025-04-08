import { fetchAPI } from '..';

export const handleGoogleLogin = async (authCode: string) => {
  const data = await fetchAPI({
    method: 'GET',
    endpoint: `/auth/google/callback?code=${authCode}`,
  });

  return data;
};
