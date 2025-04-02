'use client';

import { useEffect } from 'react';
import useAuthStore from '@/app/store/authStore';
import { handleGoogleLogin } from '@/app/api/auth/login';

const GoogleCallbackPage: React.FC = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const authCode = new URLSearchParams(window.location.search).get('code');
      if (!authCode) {
        console.error('Authorization code is missing.');
        return;
      }

      try {
        // GET 요청으로 authCode를 쿼리 스트링에 포함하여 서버로 전송
        const data = await handleGoogleLogin(authCode);
        const accessToken = data.accessToken;

        if (!accessToken) {
          throw new Error('Access token is missing in the response.');
        }

        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);

        alert('로그인에 성공했습니다.');
        window.location.href = '/main';
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    handleGoogleCallback();
  }, [setAccessToken]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Google 로그인 처리 중...</p>
    </div>
  );
};

export default GoogleCallbackPage;
