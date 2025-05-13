import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FavoriteWebtoon } from '@/model/Webtoon';
import Button from '@/app/_component/Button';

const WebtoonItem: React.FC<FavoriteWebtoon> = ({
webtoonId,
thumbnail,
title,
authorNickname,
updatedAt,
genre,
episodeCount,
}) => {
  const router = useRouter();
  function navigateToWebtoon() {
    router.push(`/webtoon/list?id=${webtoonId}`);
  }

  function navigateToEpisode() {
    router.push(`/webtoon/detail?titleId=${webtoonId}&no=${episodeCount}`);
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줘야 함
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  const formattedUpdatedAt = formatDate(updatedAt);

  return (
    <div className="w-[425px] h-[170px] flex items-center relative">
      <div className="flex w-[297px] h-[150px]">
        <Image
          src={thumbnail}
          alt={title}
          width={100}
          height={150}
          className="w-[100px] h-[150px] object-cover rounded cursor-pointer"
          onClick={navigateToWebtoon}
        />
        <div className="flex flex-col w-[126px] ml-[17px] mt-5">
          <h3
            className="text-base/[18px] font-medium cursor-pointer"
            onClick={navigateToWebtoon}
          >
            {title}
          </h3>
          <p className="text-xs text-[#888888] mt-[7px]">
            {authorNickname} &#183; {genre} &#183; {episodeCount}화
          </p>
          <div className="flex items-center mt-[7px] mb-[15px]">
            <Image
              src="/assets/icon/clock.svg"
              alt="clock icon"
              width={13}
              height={13}
            />
            <p className="text-[#888888] text-xs ml-[6px] mt-[1px]">
              {formattedUpdatedAt} 업데이트
            </p>
          </div>
          <Button
            props={{
              size: 'M',
              variant: 'brand-yellow',
              handleClick: navigateToEpisode,
              containerStyles:
                'w-[126px] h-[34px] text-xs relative before:absolute before:inset-0 before:rounded-[inherit] before:border-[1px] before:border-[#FA973B]',
            }}
          >
            <div className="flex items-center justify-center relative flex-shrink-0">
              {episodeCount}화 이어서 보기
            </div>
          </Button>
        </div>
      </div>
      <Image
        src="/assets/icon/bell-gray.svg"
        alt="bell icon"
        width={24}
        height={24}
        className="absolute top-2.5 right-0"
      />
    </div>
  );
};

export default WebtoonItem;
