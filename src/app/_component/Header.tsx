'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchUserInfo } from '@/app/api/auth';
import useAuthStore from '@/app/store/authStore';
import ProfileModal from '@/app/modal/_component/ProfileModal';
import SearchKeyword from './SearchKeyword';

const DEFAULT_USER_INFO = {
  id: 0,
  nickname: '',
  businessEmail: '',
  imageUrl: '',
  shortIntroduction: '',
};

const Header: React.FC = () => {
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
        const userInfo = await fetchUserInfo(accessToken);
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
        // 에러가 FetchError 객체일 경우에만 상태 코드 확인
        if (err instanceof Response && err.status === 401) {
          console.warn(
            'Unauthorized access. Setting user to default (not logged in).'
          );
          setUserInfo(DEFAULT_USER_INFO);
        } else {
          // 401 외의 에러는 그대로 처리
          console.error('Failed to fetch user info:', err);
        }
      }
    };

    handleFetchUserInfo();
  }, [setUserInfo]);

  return (
    <header className="fixed w-full bg-white z-50">
      <div className="flex items-center justify-between w-full max-w-[1024px] h-[80px] mx-auto px-4 p-0 relative">
        <hr className="fixed left-0 w-[100vw] mt-[81px]" />
        <div className="flex items-center space-x-10">
          <Link
            href="/"
            className="flex items-center text-lg md:text-xl font-bold"
          >
            <span className="text-brand-yellow">Dream</span>
            <span className="text-brand-blue">ketcher</span>
          </Link>
        </div>

        <div className="flex justify-end w-full max-w-[600px]">
          <div className="flex items-center w-fit gap-3">
            <SearchKeyword />
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
                <Link href="/login" className="px-2 py-2 text-sm">
                  로그인
                </Link>
              )}
            </div>
            {isModalOpen && (
              <ProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
