'use client';

import { useState } from 'react';
import Input from '@/app/_component/Input';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/app/_component/Button';
import Textarea from '@/app/_component/Textarea';
import { useUpdateProfile } from '@/app/hooks/useUpdateProfile';

const Temp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState(searchParams.get('name') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [bio, setBio] = useState(searchParams.get('bio') || '');
  const [imageUri, setImageUri] = useState(
    searchParams.get('imageUri') || '/assets/images/profile1.png'
  );

  const { mutate } = useUpdateProfile();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUri(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const profileData = { name, email, bio, imageUri };
    mutate(profileData, {
      onSuccess: () => {
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
        <h2 className="text-xl font-semibold">프로필 수정</h2>
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
          src={imageUri}
          alt="프로필 이미지"
          width={90}
          height={90}
          className="rounded-full object-cover"
        />
        <img
          className="w-[70px] h-[70px] rounded-full mr-6"
          src={imageUri}
          alt="프로필"
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
          text={name}
          placeholder="닉네임을 작성해주세요."
          subText={`${name.length}/30`}
          onChange={(value) => value.length <= 30 && setName(value)}
        />
        <p className="text-[13px] text-[#C9C9C9] mt-1">
          비속어, 타인의 권리를 침해하는 닉네임의 경우, 임의로 닉네임이 변경될
          수 있습니다.
        </p>
      </div>

      <div className="w-full mb-10">
        <label className="text-sm font-medium mb-1 block">자기소개</label>
        <Textarea
          text={bio}
          placeholder="자기소개를 입력하세요."
          subText={`${bio.length}/100`}
          height="200px"
          onChange={(value) => value.length <= 100 && setBio(value)}
        />
      </div>

      <div className="w-full mb-4">
        <label className="text-sm font-medium mb-1 block">
          비즈니스 이메일
        </label>
        <Input
          text={email}
          placeholder="비즈니스 이메일을 작성해주세요."
          containerStyles="text-xs"
          onChange={(value) => setEmail(value)}
        />
      </div>
    </div>
  );
};

export default Temp;
