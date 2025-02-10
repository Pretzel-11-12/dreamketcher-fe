import { User } from '@/model/User';

export const fetchProfile = async (accessToken: string): Promise<User> => {
  try {
    const response = await fetch('/api/v1/member/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user info: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
