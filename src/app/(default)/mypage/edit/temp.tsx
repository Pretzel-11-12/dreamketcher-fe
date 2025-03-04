'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Button from '@/app/_component/Button';
import Input from '@/app/_component/Input';
import Textarea from '@/app/_component/Textarea';
import useAuthStore from '@/app/store/authStore';
import { updateProfile } from '@/app/api/auth/updateProfile';
import { User } from '@/model/User';

const Temp = () => {
  const router = useRouter();
  const {
    id,
    nickname,
    businessEmail,
    imageUrl,
    shortIntroduction,
    setUserInfo,
  } = useAuthStore();

  const [tempNickname, setTempNickname] = useState(nickname || '');
  const [tempBusinessEmail, setTempBusinessEmail] = useState(
    businessEmail || ''
  );
  const [tempShortIntroduction, setTempShortIntroduction] = useState(
    shortIntroduction || ''
  );
  const [tempImageUrl, setTempImageUrl] = useState(
    imageUrl || '/assets/images/profile-default.png'
  );

  // 프로필 정보가 새로고침해도 유지되도록 초기 데이터 설정
  useEffect(() => {
    setTempNickname(nickname || '');
    setTempBusinessEmail(businessEmail || '');
    setTempShortIntroduction(shortIntroduction || '');
    setTempImageUrl(imageUrl || '/assets/images/profile-default.png');
  }, [nickname, businessEmail, imageUrl, shortIntroduction]);

  // 프로필 업데이트 뮤테이션
  const { mutate } = useMutation({
    mutationFn: async (profileData: User) => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
      return updateProfile(profileData, accessToken);
    },
    onSuccess: () => {
      setUserInfo({
        id: id ?? 0,
        nickname: tempNickname,
        businessEmail: tempBusinessEmail,
        imageUrl: tempImageUrl,
        shortIntroduction: tempShortIntroduction,
      });
      router.push('/mypage');
    },
    onError: () => {},
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTempImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (id === null) {
      alert('유효하지 않은 사용자입니다.');
      return;
    }
    if (!tempNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    const regex = /^[가-힣a-zA-Z0-9\s]*$/;
    if (!regex.test(tempNickname)) {
      alert('특수문자는 닉네임에 포함할 수 없습니다.');
      return;
    }

    const updatedProfile = {
      id,
      nickname: tempNickname,
      businessEmail: tempBusinessEmail,
      imageUrl: tempImageUrl,
      shortIntroduction: tempShortIntroduction,
    };

    mutate(updatedProfile);
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-[700px] mt-[50px] mx-auto px-6 py-5">
      {/* Header */}
      <div className="flex justify-between items-center w-[870px] h-[39px] mt-[13px] mb-10">
        <button
          className={'w-6 h-6 pr-[88px]'}
          onClick={() => router.push('/mypage')}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-titleBlack">프로필 수정</h2>
        <Button
          props={{
            size: 'M',
            variant: 'brand-yellow',
            containerStyles:
              '!w-[88px] h-[39px] text-xs border border-[#FBA250]',
          }}
        >
          <div
            className="flex gap-2 items-center justify-center text-base"
            onClick={handleSave}
          >
            저장
          </div>
        </Button>
      </div>

      <div className="relative w-24 h-24 mb-[37px]">
        <Image
          src={tempImageUrl}
          alt="프로필 이미지"
          width={90}
          height={90}
          className="rounded-full object-cover border border-[#F2F2F2] w-[90px] h-[90px]"
        />
        <label
          htmlFor="profileImageInput"
          className="w-[29px] h-[29px] flex flex-col items-center justify-center absolute bottom-2 right-[3px] bg-white rounded-full p-1 cursor-pointer border border-[#C9C9C9]"
        >
          <Image
            src="/assets/icon/camera.svg"
            alt="카메라"
            width={16}
            height={13}
          />
        </label>
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="w-[765px] mb-10">
        <label className="text-base font-medium mb-2 block">닉네임</label>
        <Input
          text={tempNickname}
          placeholder="닉네임을 작성해주세요."
          maxLength={30}
          currentTextLength={tempNickname.length}
          onChange={(value) => value.length <= 30 && setTempNickname(value)}
          height="44px"
        />
        <p className="text-[13px] text-[#C9C9C9] mt-2">
          비속어, 타인의 권리를 침해하는 닉네임의 경우, 임의로 닉네임이 변경될
          수 있습니다.
        </p>
      </div>

      <div className="w-[765px] mt-1 mb-10">
        <label className="text-base font-medium mb-1 block">자기소개</label>
        <Textarea
          text={tempShortIntroduction}
          placeholder="자기소개를 입력하세요."
          subText={`${tempShortIntroduction.length}/100`}
          height="237px"
          onChange={(value) =>
            value.length <= 100 && setTempShortIntroduction(value)
          }
        />
      </div>

      <div className="w-[765px] mb-4">
        <label className="text-sm font-medium mb-1 block">
          비즈니스 이메일
        </label>
        <Input
          text={tempBusinessEmail}
          placeholder="비즈니스 이메일을 작성해주세요."
          containerStyles="text-xs"
          onChange={(value) => setTempBusinessEmail(value)}
          height="44px"
        />
      </div>
    </div>
  );
};

export default Temp;
