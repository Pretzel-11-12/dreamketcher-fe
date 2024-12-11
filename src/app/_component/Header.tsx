"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlarmModalOpen, setAlarmModalOpen] = useState(false);
  const userId: Number = 1;
  const profileImage: any = null;

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleAlarmModal = () => {
    setAlarmModalOpen(!isAlarmModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeAlarmModal = () => {
    setAlarmModalOpen(false);
  };

  return (
    <header className="fixed w-full bg-white z-50">
      <div className="flex items-center justify-between w-full max-w-[1024px] h-[80px] mx-auto px-4 md:px-0 relative">
        <div className="flex items-center space-x-10">
          <Link
            href="/"
            className="flex items-center text-lg md:text-xl font-bold"
          >
            <span className="text-brand-yellow">Dream</span>
            <span className="text-brand-blue">ketcher</span>
          </Link>
          <div className="flex text-[#888888]">
            <button className="border-r border-r-line w-[65px] h-[36px] text-black">
              홈
            </button>
            <button className="border-r border-r-line w-[65px] h-[36px]">
              구독
            </button>
            <button className="border-r border-r-line w-[65px] h-[36px]">
              보관함
            </button>
          </div>
        </div>

        <div className="flex justify-end w-full max-w-[570px]">
          <div className="flex items-center w-[380px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-[263px] h-[34px] p-2 bg-line rounded-[100px]"
            />
            <div className="relative flex text-black">
              {userId !== 0 ? (
                <>
                  <Link href="/login" className="px-4 py-2">
                    마이페이지
                  </Link>
                  {/* 알림 아이콘 숨김 처리 */}
                  <Link href="/login" className="px-4 py-2">
                    로그인
                  </Link>
                </>
              ) : (
                <Link href="/login" className="px-4 py-2">
                  로그아웃
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
