'use client';

import { useEffect, useState } from 'react';
import useAuthStore from '@/app/store/authStore';
import { handleGoogleLogin } from '@/app/api/auth/login';
import Loading from '@/app/_component/Loading';

const GoogleCallbackPage: React.FC = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const authCode = new URLSearchParams(window.location.search).get('code');
      if (!authCode) {
        console.error('Authorization code is missing.');
        return;
      }

      const start = Date.now();

      try {
        // GET 요청으로 authCode를 쿼리 스트링에 포함하여 서버로 전송
        const data = await handleGoogleLogin(authCode);
        const accessToken = data.accessToken;

        if (!accessToken) {
          throw new Error('Access token is missing in the response.');
        }

        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);

      } catch (error) {
        console.error('구글 로그인 실패:', error);
      } finally {
        const elapsed = Date.now() - start;
        const MIN_LOADING_TIME = 2000;

        const delay = Math.max(0, MIN_LOADING_TIME - elapsed);
        setTimeout(() => {
          setIsLoading(false);

          setTimeout(() => {
            window.location.href = '/main';
          }, 200);
        }, delay);
      }
    };

    handleGoogleCallback();
  }, [setAccessToken]);

  return isLoading ? <Loading /> : null;
};

export default GoogleCallbackPage;
