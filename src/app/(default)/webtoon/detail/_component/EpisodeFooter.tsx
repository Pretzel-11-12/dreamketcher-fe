'use client';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const EpisodeFooter = ({ isVisible }: { isVisible: boolean }) => {
  const [isDisplay, setDisplay] = useState(true);
  const [isManualToggle, setManualToggle] = useState(false);

  const handleScroll = () => {
    if (!isManualToggle) {
      setDisplay(window.scrollY <= 300);
    }
  };


  const throttleScroll = _.throttle(handleScroll, 300);

  const handleClickComment = () => {
    window.scrollTo({
      top: 2300,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', throttleScroll);
    return () => {
      window.removeEventListener('scroll', throttleScroll);
    };
  }, []);

  return (
    <div
      className="w-full h-[50px] bg-[#FFFFFF] fixed bottom-0 border-t border-[#C9C9C9] flex items-center justify-center transition-opacity duration-300 z-50"
      style={{
        opacity: isVisible || isDisplay ? 1 : 0
      }}
      onMouseEnter={() => !isManualToggle && setDisplay(true)}
      onMouseLeave={() =>
        !isManualToggle && window.scrollY >= 300 && setDisplay(false)
      }
    >
      <div className="w-[720px] h-[34px] flex items-center text-sm text-[#3F3F3F] gap-3 justify-between">
        <div className="flex gap-5 items-center">
          <div className="cursor-pointer items-center flex gap-2">
            <Image
              src="/assets/icon/menu.svg"
              alt="menu"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            목록
          </div>

          <div
            className="cursor-pointer items-center flex gap-2"
            onClick={handleClickComment}
          >
            <Image
              src="/assets/icon/blackMessage.svg"
              alt="reply"
              width={24}
              height={24}
              className="w-6 h-6 cursor-pointer"
            />
            1,174
          </div>
        </div>

        <div className="flex">
          <div className="cursor-pointer items-center flex gap-2 pr-[30px] border-r border-[#F2F2F2]">
            <Image
              src="/assets/icon/arrow-up.svg"
              alt="leftArrow"
              width={24}
              height={24}
              className="w-6 h-6 cursor-pointer -rotate-90"
            />
            이전화
          </div>
          <div className="cursor-pointer items-center flex gap-2 pl-[30px]">
            다음화
            <Image
              src="/assets/icon/arrow-up.svg"
              alt="rightArrow"
              width={24}
              height={24}
              className="w-6 h-6 cursor-pointer rotate-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeFooter;
