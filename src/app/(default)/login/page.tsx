'use client';

import { Env } from '@/app/util/environment';

const LoginPage: React.FC = () => {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  // const REDIRECT_URI =
  //   (Env.isDev()
  //     ? process.env.NEXT_PUBLIC_BASE_URL_DEV!
  //     : process.env.NEXT_PUBLIC_BASE_URL_PROD!) + '/login/google';
  const REDIRECT_URI = 'http://api.dreamketcher.site/login/google';
  const handleGoogleLogin = async () => {
    const googleOAuthURL =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code` +
      `&scope=openid%20email%20profile` +
      `&access_type=offline`;

    window.location.href = googleOAuthURL;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center bg-white p-8 rounded-lg">
        <h1 className="text-xl font-bold mb-2">드림케쳐 로그인</h1>
        <p className="text-xs text-gray-500 mb-12">
          창작자를 위한 플랫폼, 드림케쳐에 오신 것을 환영합니다
        </p>
        <div className="space-y-2">
          {/* 구글 로그인 */}
          <button
            className="flex items-center justify-center w-full"
            onClick={handleGoogleLogin}
          >
            <img
              src="/assets/images/google-button.svg"
              alt="Google Login Button"
            />
          </button>

          {/* 네이버 로그인 */}
          <button className="flex items-center justify-center w-full">
            <img
              src="/assets/images/naver-button.svg"
              alt="Naver Login Button"
            />
          </button>

          {/* 카카오 로그인 */}
          <button className="flex items-center justify-center w-full">
            <img
              src="/assets/images/kakao-button.svg"
              alt="Kakao Login Button"
            />
          </button>

          {/* 애플 로그인 */}
          <button className="flex items-center justify-center w-full">
            <img
              src="/assets/images/apple-button.svg"
              alt="Apple Login Button"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
