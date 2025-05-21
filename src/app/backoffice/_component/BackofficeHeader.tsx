'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '@/app/store/authStore';
import AdminProfileModal from '@/app/modal/_component/AdminProfileModal';
import { useRouter } from 'next/navigation';
import { fetchProfile } from '@/app/api/auth/fetchProfile';

const DEFAULT_USER_INFO = {
  id: 0,
  nickname: '',
  businessEmail: '',
  imageUrl: '',
  shortIntroduction: '',
};

const BackofficeHeader: React.FC = () => {
  const { id, imageUrl, setUserInfo } = useAuthStore();
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

  return (
    <header className="fixed w-full bg-white z-50 border-b border-[#F2F2F2]">
      <div className="flex items-center justify-between w-full h-[70px] mx-auto px-5 relative">
        <div className="flex items-center gap-[5px]">
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
          <Link href="/backoffice" className="pl-[5px]">
            <p className="text-brand-blue text-[20px]">Backoffice</p>
          </Link>
        </div>
        <div className="flex justify-end w-full max-w-[600px]">
          <div className="relative flex text-black gap-[15px] items-center h-[34px]">
            <button
              className="h-[34px] p-[10px] rounded-[5px] border border-1 border-[#e0e0e0] flex items-center justify-center text-titleBlack text-[14px]"
              onClick={handleGoBack}
            >
              관리자 페이지 나가기
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
            <AdminProfileModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default BackofficeHeader;
