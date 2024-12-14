'use client';

import { useEffect } from 'react';
import useAuthStore from '@/app/store/authStore';
import { fetchUserInfo } from '@/app/api/auth';

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
        const response = await fetch(
          `/api/v1/auth/google/callback?code=${authCode}`,
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to authenticate: ${response.statusText}`);
        }

        const data = await response.json();
        const accessToken = data.accessToken;

        if (!accessToken) {
          throw new Error('Access token is missing in the response.');
        }
        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);

        const userInfo = await fetchUserInfo(accessToken);
        setUserInfo({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          imageUrl: userInfo.imageUrl,
        });

        alert('로그인에 성공했습니다.');

        window.location.href = '/main';
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    handleGoogleCallback();
  }, [[setAccessToken, setUserInfo]]);

  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-lg font-medium'>Google 로그인 처리 중...</p>
    </div>
  );
};

export default GoogleCallbackPage;
