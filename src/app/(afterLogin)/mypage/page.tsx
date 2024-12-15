'use client';

import { useEffect } from 'react';
import { fetchUserInfo } from '@/app/api/auth';
import useAuthStore from '@/app/store/authStore';

export default function Mypage() {
  const { name, email, imageUrl, setUserInfo } = useAuthStore();

  useEffect(() => {
    const handleFetchUserInfo = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token is missing');
        }

        const userInfo = await fetchUserInfo(accessToken);
        setUserInfo({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          imageUrl: userInfo.imageUrl,
        });
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    };

    handleFetchUserInfo();
  }, [setUserInfo]);

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>내 정보</h1>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <img src={imageUrl || '/assets/images/person.png'} alt='프로필' />
          <p className='text-lg text-gray-700'>
            <span className='font-semibold'>닉네임: </span> {name}
          </p>
          <p className='text-lg text-gray-700'>
            <span className='font-semibold'>이메일: </span> {email}
          </p>
        </div>
      </div>
    </div>
  );
}
