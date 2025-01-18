'use client';

import { useState } from 'react';
import Input from '@/app/_component/Input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/app/_component/Button';
import Textarea from '@/app/_component/Textarea';
import { useUpdateProfile } from '@/app/hooks/useUpdateProfile';
import useAuthStore from '@/app/store/authStore';

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
  const [tempimageUrl, setTempimageUrl] = useState(
    imageUrl || '/assets/images/profile-default.png'
  );

  const { mutate } = useUpdateProfile();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTempimageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (id === null) {
      alert('유효하지 않은 사용자입니다.');
      return;
    }

    const updatedProfile = {
      id,
      nickname: tempNickname,
      businessEmail: tempBusinessEmail,
      imageUrl: tempimageUrl,
      shortIntroduction: tempShortIntroduction,
    };

    console.log(updatedProfile);

    mutate(updatedProfile, {
      onSuccess: () => {
        setUserInfo(updatedProfile);
        alert('프로필 저장이 완료되었습니다.');
        router.push('/mypage');
      },
      onError: () => {
        alert('프로필 저장에 실패했습니다.');
      },
    });
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-[700px] mt-10 mx-auto p-6 border-r border-r-line">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-6">
        <button
          className={'w-6 h-6 pr-[88px]'}
          onClick={() => router.push('/mypage')}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-[#282828]">프로필 수정</h2>
        <Button
          props={{
            size: 'M',
            variant: 'brand-yellow',
            containerStyles: '!w-[88px] h-[39px] text-xs px-2 py-3',
          }}
        >
          <div
            className="flex gap-2 items-center justify-center"
            onClick={handleSave}
          >
            저장
          </div>
        </Button>
      </div>

      <div className="relative w-24 h-24 mb-4">
        <Image
          src={tempimageUrl}
          alt="프로필 이미지"
          width={90}
          height={90}
          className="rounded-full object-cover border border-[#F2F2F2] w-[90px] h-[90px]"
        />
        <label
          htmlFor="profileImageInput"
          className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow-md"
        >
          <Image
            src="/assets/icon/camera.svg"
            alt="카메라"
            width={15}
            height={15}
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

      <div className="w-full mb-10">
        <label className="text-sm font-medium mb-1 block">닉네임</label>
        <Input
          text={tempNickname}
          placeholder="닉네임을 작성해주세요."
          subText={`${tempNickname.length}/30`}
          onChange={(value) => value.length <= 30 && setTempNickname(value)}
        />
        <p className="text-[13px] text-[#C9C9C9] mt-1">
          비속어, 타인의 권리를 침해하는 닉네임의 경우, 임의로 닉네임이 변경될
          수 있습니다.
        </p>
      </div>

      <div className="w-full mb-10">
        <label className="text-sm font-medium mb-1 block">자기소개</label>
        <Textarea
          text={tempShortIntroduction}
          placeholder="자기소개를 입력하세요."
          subText={`${tempShortIntroduction.length}/100`}
          height="200px"
          onChange={(value) =>
            value.length <= 100 && setTempShortIntroduction(value)
          }
        />
      </div>

      <div className="w-full mb-4">
        <label className="text-sm font-medium mb-1 block">
          비즈니스 이메일
        </label>
        <Input
          text={tempBusinessEmail}
          placeholder="비즈니스 이메일을 작성해주세요."
          containerStyles="text-xs"
          onChange={(value) => setTempBusinessEmail(value)}
        />
      </div>
    </div>
  );
};

export default Temp;
