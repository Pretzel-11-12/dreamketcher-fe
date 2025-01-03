'use client';

import { useEffect } from 'react';
import { fetchUserInfo, Member } from '@/app/api/auth';
import useAuthStore from '@/app/store/authStore';

import Image from 'next/image';

import MyWork from './_component/MyWork';
import { useRouter } from 'next/navigation';
import ClipboardButton from '@/app/_component/ClipboardButton';
import { useQuery } from '@tanstack/react-query';

export default function Mypage() {
  const router = useRouter();
  //const { name, email, imageUrl, setUserInfo } = useAuthStore();
  const { data, isLoading, isError } = useQuery<Member>({
    queryKey: ['member'],
    queryFn: () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
      return fetchUserInfo(accessToken);
    },
    enabled: !!localStorage.getItem('accessToken'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;

  const handleEditProfile = () => {
    if (!data) {
      console.error('유저 데이터가 존재하지 않습니다.');
      return;
    }

    const query = `?name=${encodeURIComponent(
      data.name
    )}&email=${encodeURIComponent(data.email)}&imageUri=${encodeURIComponent(
      data.imageUri
    )}
    )}`;
    router.push(`/mypage/edit${query}`);
  };

  const emailText = data?.email || '지정된 이메일이 없습니다.';

  return (
    <div className="min-h-screen flex flex-col pr-[20px] border-r border-r-line">
      <div className="max-w-4xl bg-white mt-[70px] flex">
        <img
          className="w-[70px] h-[70px] rounded-full mr-6"
          src={data?.imageUri || '/assets/images/profile1.png'}
          alt="프로필"
        />

        <div className="ml-[4px]">
          <p className="text-[18px] font-medium text-gray-800 mt-[8px]">
            {data?.name}
          </p>
          <div className="flex">
            <Image
              src={'/assets/images/mail.svg'}
              alt="Mail Icon"
              width={11}
              height={9}
            />
            <p className="text-[12px] text-gray-500 m-1">{data?.email}</p>
            <ClipboardButton textToCopy={emailText} />
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 my-4">
        손 내밀면 콕하고 찔릴 거야 네모 같은 우리 서로 남 탓하는 건 (예나
        지금이나 그대로) 상처투성이야 이러다 나 죽어 네모나고 모난 우린
        삐뚤빼뚤해 like
      </p>

      <button
        className="px-4 py-2 w-[700px] h-[61px] mt-2 text-[18px] font-medium border rounded-md"
        style={{
          borderColor: '#FBA250',
          backgroundColor: '#FFFFFF',
        }}
        onClick={handleEditProfile}
      >
        프로필 수정
      </button>
      <MyWork />
    </div>
  );
}
