'use client';
import _ from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type EpisodeHeaderProps = {
  item: {
    webtoonTitle?: string;
    webtoonId: string;
    episodeTitle?: string;
    episodeNo?: number;
  };
  isVisible: boolean;
};

const EpisodeHeader: React.FC<EpisodeHeaderProps> = ({ item, isVisible }) => {
  const [isDisplay, setDisplay] = useState(true);
  const [isManualToggle, setManualToggle] = useState(false);

  const handleScroll = () => {
    if (!isManualToggle) {
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

  const throttleScroll = _.throttle(handleScroll, 300);

  useEffect(() => {
    window.addEventListener('scroll', throttleScroll);
    return () => {
      window.removeEventListener('scroll', throttleScroll);
    };
  }, [throttleScroll]);

  return (
    <div
      className="w-full h-[64px] bg-[#FFFFFF] text-[#3F3F3F] font-medium fixed flex items-center justify-center transition-opacity duration-300 z-30"
      style={{
        boxShadow: 'inset 0 -1px 0 #C9C9C9',
        opacity: isVisible || isDisplay ? 1 : 0,
      }}
      onMouseEnter={() => !isManualToggle && setDisplay(true)}
      onMouseLeave={() =>
        !isManualToggle && window.scrollY >= 300 && setDisplay(false)
      }
    >
      <div className="w-[720px] flex items-center text-md gap-3">
        <Image
          src="/assets/icon/arrow-up.svg"
          alt="leftArrow"
          width={34}
          height={34}
          className="w-[24px] h-[24px] cursor-pointer -rotate-90"
        />
        {item.webtoonTitle}
        {item.episodeNo}화 - {item.episodeTitle}
      </div>
    </div>
  );
};

export default EpisodeHeader;
