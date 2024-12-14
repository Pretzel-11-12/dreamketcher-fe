'use client';

import useAuthStore from '@/app/store/authStore';

export default function Mypage() {
  const { name, email, imageUrl } = useAuthStore();

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>내 정보</h1>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <p className='text-lg text-gray-700'>
            <span className='font-semibold'></span> {imageUrl}
            <span className='font-semibold'>닉네임 : </span> {name}
            <span className='font-semibold'>email : </span> {email}
          </p>
        </div>
      </div>
    </div>
  );
}
