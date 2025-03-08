import { fetchAPI } from '..';
import { User } from '@/model/User';
import useAuthStore from '@/app/store/authStore';

export const updateProfile = async (profileData: User, token: string) => {
  const { imageUrl: originalImageUrl } = useAuthStore.getState();

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

    // 기존 imageUrl과 현재 입력된 imageUrl이 다를 경우만 파일 추가
    if (profileData.imageUrl && profileData.imageUrl !== originalImageUrl) {
      const response = await fetch(profileData.imageUrl);
      const fileBlob = await response.blob();

      const file = new File([fileBlob], 'profileImage.jpg', {
        type: fileBlob.type,
      });

      formDataToSend.append('image', file);
    }

    return formDataToSend;
  };

  try {
    const jsonBlob = jsonToBlob();
    const formData = await createFormDataWithFile(jsonBlob);

    await fetchAPI({
      method: 'PATCH',
      endpoint: '/member/profile',
      body: formData,
      isFormData: true,
    });
    alert('프로필이 성공적으로 수정되었습니다.');
  } catch (error: any) {
    if (error.code === 'NICKNAME_ALREADY_EXISTS') {
      alert('이미 존재하는 닉네임입니다.');
    } else if (error.code === 'ARGUMENT_NOT_VALID') {
      alert('이메일 형식이 올바르지 않습니다.');
    } else if (error.code === 'BUSINESS_EMAIL_ALREADY_EXISTS') {
      alert('이미 존재하는 비즈니스 이메일입니다.');
    } else {
      alert('프로필 수정 중 오류가 발생했습니다.');
    }
    throw error;
  }
};
