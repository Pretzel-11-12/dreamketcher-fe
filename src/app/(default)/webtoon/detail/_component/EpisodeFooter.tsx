'use client';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DetailEpisodeList from './DetailEpisodeList';

const EpisodeFooter = ({
  isVisible,
  onClickComment,
}: {
  isVisible: boolean;
  onClickComment: () => void;
}) => {
  const [isDisplay, setDisplay] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const episodeListData = [
    {
      id: '1',
      title: '1화',
      description: '1화 설명',
      image: '/assets/images/episode-1.jpg',
    },
    {
      id: '2',
      title: '2화',
      description: '1화 설명',
      image: '/assets/images/episode-2.jpg',
    },
    {
      id: '3',
      title: '3화',
      description: '1화 설명',
      image: '/assets/images/episode-3.jpg',
    },
    {
      id: '4',
      title: '4화',
      description: '1화 설명',
      image: '/assets/images/episode-4.jpg',
    },
    {
      id: '5',
      title: '5화',
      description: '1화 설명',
      image: '/assets/images/episode-5.jpg',
    },
  ];
  const handleScroll = () => {
    if (!isMenuOpen) {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (
        scrollPosition <= 300 ||
        scrollPosition + windowHeight >= documentHeight - 300
      ) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    }
  };

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const throttleScroll = _.throttle(handleScroll, 300);

  useEffect(() => {
    window.addEventListener('scroll', throttleScroll);
    return () => {
      window.removeEventListener('scroll', throttleScroll);
    };
  }, []);

  return (
    <div className="w-full h-fit min-h-[50px]">
      {isMenuOpen && (
        <DetailEpisodeList
          episodeList={episodeListData}
          isDisplay={isDisplay}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
      <div
        className="w-full h-[50px] bg-[#FFFFFF] fixed bottom-0 border-t border-[#C9C9C9] flex items-center justify-center transition-opacity duration-300 z-50"
        style={{
          opacity: isVisible || isDisplay ? 1 : 0,
        }}
        onMouseEnter={() => !isMenuOpen && setDisplay(true)}
        onMouseLeave={() =>
          !isMenuOpen && window.scrollY >= 300 && setDisplay(false)
        }
      >
        <div className="w-[720px] h-[34px] flex items-center text-sm text-[#3F3F3F] gap-3 justify-between">
          <div className="flex gap-5 items-center">
            <div
              className={`cursor-pointer items-center flex gap-2 ${
                isMenuOpen ? 'text-brand-yellow' : ''
              }`}
              onClick={handleMenuClick}
            >
              <Image
                src={
                  isMenuOpen
                    ? '/assets/icon/menu-yellow.png'
                    : '/assets/icon/menu.svg'
                }
                alt="menu"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              목록
            </div>

            <div
              className="cursor-pointer items-center flex gap-2"
              onClick={onClickComment}
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
    </div>
  );
};

export default EpisodeFooter;
