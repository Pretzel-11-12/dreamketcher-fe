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
};
const EpisodeHeader: React.FC<EpisodeHeaderProps> = ({ item }) => {
  const [isDisplay, setDisplay] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  };

  const throttleScroll = _.throttle(handleScroll, 300);

  useEffect(() => {
    window.addEventListener('scroll', throttleScroll);
    return () => {
      window.removeEventListener('scroll', throttleScroll);
    };
  }, []);

  return (
    <div
      className="w-full h-[50px] bg-[#F9F9F9] fixed border-b flex items-center justify-center transition-opacity duration-300 z-30"
      style={isDisplay ? { opacity: 1 } : { opacity: 0 }}
      onMouseEnter={() => setDisplay(true)}
      onMouseLeave={() => window.scrollY >= 300 && setDisplay(false)}
    >
      <div className="w-[800px] flex items-center text-md gap-3">
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
