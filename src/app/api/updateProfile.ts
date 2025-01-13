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

    if (profileData.imageUrl) {
      // Blob URL을 파일 객체로 변환
      const response = await fetch(profileData.imageUrl);
      const fileBlob = await response.blob();

      // Blob을 File 객체로 변환
      const file = new File([fileBlob], 'profileImage.jpg', {
        type: fileBlob.type,
      });

      // 파일을 FormData에 추가
      formDataToSend.append('image', file); // 실제 파일 추가
    }

    formDataToSend.forEach((value, key) => {
      console.log(key, value);
    });

    return formDataToSend;
  };

  const jsonBlob = jsonToBlob();
  const formData = await createFormDataWithFile(jsonBlob);

  const response = await fetch('/api/v1/member/profile', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('프로필 수정에 실패했습니다.');
  }

  return;
};
