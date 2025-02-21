'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProfile } from '@/app/api/auth/fetchProfile';
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
        const userInfo = await fetchProfile();
        setUserInfo({
          id: userInfo.id,
          nickname: userInfo.nickname || '',
          businessEmail: userInfo.businessEmail || '',
          imageUrl: userInfo.imageUrl,
          shortIntroduction: userInfo.shortIntroduction || '',
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
      <div className="flex items-center justify-between w-full max-w-[1200px] h-[70px] mx-auto relative">
        <hr className="fixed left-0 w-[100vw] mt-[70px]" />
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
          <div className="flex items-center w-fit gap-[20px]">
            <SearchKeyword />
            <div className="relative flex text-black gap-[20px] items-center">
              {id ? (
                <>
                  <Image
                    src="/assets/icon/bell.svg"
                    alt="noti button"
                    width={34}
                    height={34}
                    className="cursor-pointer"
                  />
                  <Image
                    src={imageUrl || '/assets/images/profile-default.png'}
                    alt="profile button"
                    width={30}
                    height={30}
                    onClick={handleOpenModal}
                    className="cursor-pointer rounded-full object-cover w-[30px] h-[30px]"
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
      </div>
    </header>
  );
};

export default Header;
