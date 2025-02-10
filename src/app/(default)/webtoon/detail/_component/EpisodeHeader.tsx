'use client';
import _ from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
      setDisplay(window.scrollY <= 300);
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
      className="w-full h-[50px] bg-[#F9F9F9] fixed border-b flex items-center justify-center transition-opacity duration-300 z-30"
      style={{ opacity: isVisible || isDisplay ? 1 : 0 }}
      onMouseEnter={() => !isManualToggle && setDisplay(true)}
      onMouseLeave={() =>
        !isManualToggle && window.scrollY >= 300 && setDisplay(false)
      }
    >
      <div className="w-[720px] flex items-center text-md gap-3">
        <Link
          href={{
            pathname: '/webtoon/list',
            query: { id: item.webtoonId },
          }}
        >
          <span className="mdi mdi-chevron-left text-2xl" />
        </Link>
        {item.webtoonTitle}
        {item.episodeNo}화 - {item.episodeTitle}
      </div>
    </div>
  );
};

export default EpisodeHeader;
