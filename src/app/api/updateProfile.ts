import { UpdateProfileData } from '../model/Profile';

export const updateProfile = async (
  profileData: UpdateProfileData,
  token: string
) => {
  const formData = new FormData();
  formData.append('name', profileData.name);
  formData.append('email', profileData.email);
  formData.append('bio', profileData.bio);
  if (profileData.imageUri) {
    const response = await fetch(profileData.imageUri);
    const blob = await response.blob();
    formData.append('profileImage', blob, 'profile.jpg');
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
