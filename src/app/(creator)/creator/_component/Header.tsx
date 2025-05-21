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

  const { id, imageUrl, setUserInfo } = useAuthStore();

  useEffect(() => {
    const handleFetchUserInfo = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.log('No access token found. User is not logged in.');
        setUserInfo(DEFAULT_USER_INFO);
        router.push('/login');
        return;
      }

      try {
        const userInfo = await fetchProfile();
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
        router.push('/login');

        // 서버 요청 실패 시 비로그인 상태로 처리
        setUserInfo(DEFAULT_USER_INFO);
      }
    };

    handleFetchUserInfo();
  }, [setUserInfo]);

  return (
    <header className="fixed w-full bg-white z-50 border-b border-[#F2F2F2]">
      <div className="flex items-center justify-between w-full h-[70px] mx-auto px-5 relative">
        <div className="flex items-center gap-[5px]">
          <button
            className="relative w-[24px] h-[24px] border-0 bg-transparent p-0"
            onClick={handleGoBack}
          >
            <Image src="/assets/icon/creator-back.png" alt="뒤로 가기" fill />
          </button>
          <Link href="/main">
            <Image
              src="/assets/images/d-studio-logo.png"
              alt="profile button"
              width={38}
              height={0}
              sizes="100vw"
              style={{ height: 'auto' }}
            />
          </Link>
          <Link href="/creator/series" className="pl-[5px]">
            <Image
              src="/assets/images/studio-text.png"
              alt="profile button"
              width={103}
              height={26}
            />
          </Link>
        </div>
        <div className="flex justify-end w-full max-w-[600px]">
          <div className="relative flex text-black gap-[15px] items-center h-[34px]">
            <button
              className="h-[34px] p-[10px] rounded-[5px] border border-1 border-[#e0e0e0] flex items-center justify-center text-titleBlack text-[14px]"
              onClick={handleGoBack}
            >
              작업실 나가기
            </button>
            {id ? (
              <Image
                src={imageUrl || '/assets/images/profile-default.png'}
                alt="profile button"
                width={34}
                height={34}
                onClick={handleOpenModal}
                className="cursor-pointer rounded-full w-[34px] h-[34px]"
              />
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
