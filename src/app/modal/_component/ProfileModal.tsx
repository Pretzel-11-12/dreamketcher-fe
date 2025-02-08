'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuthStore from '@/app/store/authStore';
import { logout } from '@/app/api/logout';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { id, nickname, imageUrl, storeLogout } = useAuthStore();
  const accessToken = localStorage.getItem('accessToken');

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleClickMypage = () => {
    router.push('/mypage');
    onClose();
  };

  const handleClickCreatorPage = () => {
    router.push('/creator/series?status=IN_SERIES');
    onClose();
  };

  const handleClickLogout = async () => {
    if (!accessToken) {
      alert('로그인 상태가 아닙니다.');
      return;
    }

    try {
      await logout(accessToken);
      localStorage.removeItem('accessToken');
      storeLogout();
      window.location.href = '/main';
    } catch (err) {
      console.error(err);
      alert('로그아웃에 실패하였습니다.');
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-100vw flex">
      <div className="flex items-start justify-end mx-auto w-[1200px]">
        <div
          ref={modalRef}
          className="mt-[85px] w-[260px] bg-white text-black rounded-[10px] overflow-y-auto border border-line text-[14px]"
        >
          <button
            className="flex flex-row items-start justify-start gap-2 pl-4 pt-2 h-[50px] border-b border-b-line w-full hover:bg-gray-100"
            onClick={handleClickMypage}
          >
            <Image
              src={imageUrl || '/assets/images/profile-default.png'}
              alt="profile button"
              width={30}
              height={30}
              className="rounded-full w-[30px] h-[30px]"
            />
            <p className="font-medium mt-[6px]">{nickname}</p>
          </button>
          <div className="flex flex-col items-center justify-start text-left ">
            <button
              className="w-full h-[50px] text-left pl-4 hover:bg-gray-100"
              onClick={handleClickCreatorPage}
            >
              작업실
            </button>
            <button className="w-full h-[50px] text-left pl-4 hover:bg-gray-100">
              설정
            </button>
            <button className="w-full h-[50px] text-left pl-4 hover:bg-gray-100">
              고객센터
            </button>
            <button
              className="w-full h-[50px] text-left pl-4 hover:bg-gray-100"
              onClick={handleClickLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
