import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '@/app/api/auth/updateProfile';
import { User } from '@/model/User';

export const useUpdateProfile = () => {
  const { mutate, data } = useMutation({
    mutationFn: (profileData: User) => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
      return updateProfile(profileData, accessToken);
    },
  });

  return { mutate, data };
};
