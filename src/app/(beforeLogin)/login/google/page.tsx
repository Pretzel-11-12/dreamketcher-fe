'use client';

import { useEffect } from 'react';

const GoogleCallbackPage: React.FC = () => {
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const authCode = new URLSearchParams(window.location.search).get('code');
      if (!authCode) {
        console.error('Authorization code is missing.');
        return;
      }

      try {
        // GET 요청으로 authCode를 쿼리 스트링에 포함하여 서버로 전송
        const response = await fetch(
          `http://localhost:8080/api/v1/auth/google/callback?code=${authCode}`,
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to authenticate: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Authentication successful:', data);

        // TODO : 추후 토큰 저장 로직 추가

        // 인증 후 홈페이지로 리다이렉트
        window.location.href = '/';
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    handleGoogleCallback();
  }, []);

  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-lg font-medium'>Google 로그인 처리 중...</p>
    </div>
  );
};

export default GoogleCallbackPage;
