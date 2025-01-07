import { User } from '@/model/User';

export const updateProfile = async (profileData: User, token: string) => {
  const formData = new FormData();
  formData.append('nickname', profileData.nickname);
  formData.append('businessEmail', profileData.businessEmail);
  formData.append('shortIntroduction', profileData.shortIntroduction);
  if (profileData.imageUrl) {
    const response = await fetch(profileData.imageUrl);
    const blob = await response.blob();
    formData.append('imageUrl', blob, 'profile.jpg');
  }

  const response = await fetch('/api/v1/member/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('프로필 수정에 실패했습니다.');
  }

  return await response.json();
};
