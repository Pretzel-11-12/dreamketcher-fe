'use client';
import _ from 'lodash';
import { useEffect, useState } from 'react';

const EpisodeFooter = () => {
  const [isDisplay, setDisplay] = useState(false);

  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + window.scrollY + 500 >=
      document.documentElement.scrollHeight;

    if (isAtBottom) {
      setDisplay(true);
    } else {
      setDisplay(false);
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
      className="w-full h-[50px] bg-[#F9F9F9] fixed bottom-0 border-t flex items-center justify-center transition-opacity duration-300 z-50"
      style={isDisplay ? { opacity: 1 } : { opacity: 0 }}
      onMouseEnter={() => setDisplay(true)}
      onMouseLeave={() => setDisplay(false)}
    >
      <div className="w-[720px] flex items-center text-sm gap-3 justify-between">
        <div className="flex gap-5 items-center">
          <div className="cursor-pointer items-center flex gap-2">
            <span className="mdi mdi-view-headline text-lg"></span>
            목록
          </div>

          <div
            className="cursor-pointer items-center flex gap-2"
            onClick={handleClickComment}
          >
            <span className="mdi mdi-comment-processing-outline text-lg"></span>
            1,174
          </div>
        </div>

        <div className="flex gap-5">
          <div className="cursor-pointer items-center flex gap-2">
            <span className="mdi mdi-chevron-left text-2xl"></span>
            이전화
          </div>
          <div className="cursor-pointer items-center flex gap-2">
            다음화
            <span className="mdi mdi-chevron-right text-2xl"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeFooter;
