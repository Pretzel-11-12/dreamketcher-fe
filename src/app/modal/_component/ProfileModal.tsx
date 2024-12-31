'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuthStore from '@/app/store/authStore';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { id, name, imageUrl } = useAuthStore();

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleClickMypage = () => {
    router.push('/mypage');
    onClose();
  };

  const handleClickLogout = () => {
    router.push('/mypage');
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
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        ref={modalRef}
        className="absolute mt-[85px] mr-[200px] w-[260px] bg-white text-black rounded-[10px] overflow-y-auto border border-line text-[14px]"
      >
        <button
          className="flex flex-row items-start justify-start gap-2 pl-4 pt-2 h-[50px] border-b border-b-line w-full hover:bg-gray-100"
          onClick={handleClickMypage}
        >
          <Image
            src="/assets/images/profile-default.png"
            alt="profile button"
            width={30}
            height={30}
          />
          <p className="font-medium m-1">{name}</p>
        </button>
        <div className="flex flex-col items-center justify-start text-left ">
          <button
            className="w-full h-[50px] text-left pl-4 hover:bg-gray-100"
            onClick={handleClickMypage}
          >
            작업실
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
  );
};

export default ProfileModal;
