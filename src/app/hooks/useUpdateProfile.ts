import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '@/app/api/updateProfile'; // fetch API 함수
import { UpdateProfileData } from '@/app/model/Profile';

export const useUpdateProfile = () => {
  const { mutate, data, isError, error } = useMutation({
    mutationFn: (profileData: UpdateProfileData) => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
      return updateProfile(profileData, accessToken);
    },
  });

  return { mutate, data, isError, error };
};
