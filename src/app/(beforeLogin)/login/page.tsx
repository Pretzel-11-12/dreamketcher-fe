'use client';

import { signIn } from 'next-auth/react';

const LoginPage: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center bg-white p-8 rounded-lg'>
        <h1 className='text-xl font-bold mb-2'>드림케쳐 로그인</h1>
        <p className='text-xs text-gray-500 mb-12'>
          창작자를 위한 플랫폼, 드림케쳐에 오신 것을 환영합니다
        </p>
        <div className='space-y-2'>
          {/* 구글 로그인 */}
          <button
            className='flex items-center justify-center w-full'
            onClick={() => signIn('google', { prompt: 'select_account' })}
          >
            <img
              src='/assets/images/google-button.svg'
              alt='Google Login Button'
            />
          </button>

          {/* 네이버 로그인 */}
          <button className='flex items-center justify-center w-full'>
            <img
              src='/assets/images/naver-button.svg'
              alt='Naver Login Button'
            />
          </button>

          {/* 카카오 로그인 */}
          <button className='flex items-center justify-center w-full'>
            <img
              src='/assets/images/kakao-button.svg'
              alt='Kakao Login Button'
            />
          </button>

          {/* 애플 로그인 */}
          <button className='flex items-center justify-center w-full'>
            <img
              src='/assets/images/apple-button.svg'
              alt='Apple Login Button'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
