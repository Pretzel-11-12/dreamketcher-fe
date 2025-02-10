'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProfile } from '@/app/api/auth/fetchProfile';
import useAuthStore from '@/app/store/authStore';
import ProfileModal from '@/app/modal/_component/ProfileModal';
import { useRouter } from 'next/navigation';

const DEFAULT_USER_INFO = {
  id: 0,
  nickname: '',
  businessEmail: '',
  imageUrl: '',
  shortIntroduction: '',
};

const Header: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [isAlarmModalOpen, setAlarmModalOpen] = useState(false);
  const { id, imageUrl, setUserInfo } = useAuthStore();
  const profileImage: any = null;

  useEffect(() => {
    const handleFetchUserInfo = async () => {
      const accessToken = localStorage.getItem('accessToken');

      // 액세스 토큰이 없으면 비로그인 상태로 처리
      if (!accessToken) {
        console.log('No access token found. User is not logged in.');
        setUserInfo(DEFAULT_USER_INFO);
        return;
      }

      try {
        const userInfo = await fetchProfile(accessToken);
        setUserInfo({
          id: userInfo.id,
          nickname: userInfo.nickname || '',
          businessEmail:
            userInfo.businessEmail || '비즈니스 이메일을 등록해주세요',
          imageUrl: userInfo.imageUrl,
          shortIntroduction:
            userInfo.shortIntroduction || '한줄소개를 작성해주세요',
        });
      } catch (err) {
        console.error('Failed to fetch user info:', err);

        // 서버 요청 실패 시 비로그인 상태로 처리
        setUserInfo(DEFAULT_USER_INFO);
      }
    };

    handleFetchUserInfo();
  }, [setUserInfo]);

  return (
    <header className="fixed w-full bg-white z-50 border-b border-[#F2F2F2]">
      <div className="flex items-center justify-between w-full max-w-[1200px] h-[70px] mx-auto px-4 md:px-0 relative">
        <div className="flex items-center gap-3">
          <span
            className="mdi mdi-chevron-left text-2xl text-gray-600 cursor-pointer"
            onClick={handleGoBack}
          />

          <Link href="/main/default">
            <Image
              src="/assets/images/d-text.png"
              alt="profile button"
              width={30}
              height={30}
            />
          </Link>

          <Link href="/creator/series?status=IN_SERIES">
            <Image
              src="/assets/images/studio-text.png"
              alt="profile button"
              width={65}
              height={30}
            />
          </Link>
        </div>
        <div className="flex justify-end w-full max-w-[600px]">
          <div className="relative flex text-black gap-3 items-center">
            {id ? (
              <>
                <Image
                  src="/assets/images/bell.png"
                  alt="noti button"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                <Image
                  src={imageUrl || '/assets/images/profile-default.png'}
                  alt="profile button"
                  width={30}
                  height={30}
                  onClick={handleOpenModal}
                  className="cursor-pointer rounded-full"
                />
              </>
            ) : (
              <Link
                className="w-[110px] h-[34px] flex items-center justify-center bg-brand-blue text-white text-sm rounded-[5px]"
                href="/login"
              >
                로그인/회원가입
              </Link>
            )}
          </div>
          {isModalOpen && (
            <ProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
