import { fetchAPI } from '..';
import { User } from '@/model/User';

export const updateProfile = async (profileData: User, token: string) => {
  const jsonToBlob = (): Blob => {
    const jsonData = {
      nickname: profileData.nickname,
      shortIntroduction: profileData.shortIntroduction,
      businessEmail: profileData.businessEmail,
    };

    return new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
  };

  const createFormDataWithFile = async (jsonBlob: Blob): Promise<FormData> => {
    const formDataToSend = new FormData();
    formDataToSend.append('profileData', jsonBlob);

    // 기본 프로필 이미지 URL과 현재 imageUrl이 다를 경우에만 파일 추가
    const DEFAULT_IMAGE_URL =
      'https://dreamketcher-server.s3.ap-northeast-2.amazonaws.com/profile-images/defaultProfileImage.png';

    if (profileData.imageUrl && profileData.imageUrl !== DEFAULT_IMAGE_URL) {
      const response = await fetch(profileData.imageUrl);
      const fileBlob = await response.blob();

      const file = new File([fileBlob], 'profileImage.jpg', {
        type: fileBlob.type,
      });

      formDataToSend.append('image', file);
    }

    return formDataToSend;
  };

  const jsonBlob = jsonToBlob();
  const formData = await createFormDataWithFile(jsonBlob);

  await fetchAPI({
    method: 'PATCH',
    endpoint: '/member/profile',
    body: formData,
    isFormData: true,
  });

  return;
};
