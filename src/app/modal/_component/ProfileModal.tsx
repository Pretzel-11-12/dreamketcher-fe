'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import useAuthStore from '@/app/store/authStore';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { id, name, imageUrl } = useAuthStore();

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
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
        className="absolute mt-[85px] mr-[200px] w-[260px] bg-white rounded-[10px] overflow-y-auto border-line"
      >
        <div className="flex flex-row items-start justify-start gap-2">
          <Image
            src="/assets/images/profile-default.png"
            alt="profile button"
            width={30}
            height={30}
          />
          <p className="text-lg font-semibold">{name}</p>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <button
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => alert('Go to My Page')}
          >
            마이페이지
          </button>
          <button
            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => alert('Logout')}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
