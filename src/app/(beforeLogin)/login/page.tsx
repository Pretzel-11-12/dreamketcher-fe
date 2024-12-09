'use client';

import { signIn } from 'next-auth/react';

const LoginPage: React.FC = () => {
  const handleGoogleLogin = async () => {
    // signIn으로 구글 로그인 페이지로 리디렉트
    const result = await signIn('google', { redirect: false });

    if (result?.url) {
      // 현재 URL에서 쿼리 매개변수로 전달된 code 추출
      const authCode = new URLSearchParams(window.location.search).get('code');

      if (authCode) {
        console.log('Google Authorization Code:', authCode);
        // 인증 코드 서버로 전송
        await fetch('/api/v1/auth/google/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: authCode }),
        });
      } else {
        console.error('Authorization code not found in URL.');
      }
    } else {
      console.error('Login failed or URL is null.');
    }
  };

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
            onClick={handleGoogleLogin}
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
