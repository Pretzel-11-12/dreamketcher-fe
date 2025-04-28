import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserWebtoon } from '@/model/Webtoon';

const CompletedWorkItem: React.FC<UserWebtoon> = ({
id,
thumbnail,
title,
authorNickname,
story,
genre,
episodeCount,
avgStar,
commentCount,
}) => {
  const router = useRouter();
  function navigateToWebtoon() {
    router.push(`/webtoon/list?id=${id}`);
  }

  return (
    <div className="w-[570px] h-[170px] flex relative gap-[18px] pt-[10px]">
      <img
        src={thumbnail}
        alt={title}
        className="w-[100px] h-[150px] object-cover rounded cursor-pointer"
        onClick={navigateToWebtoon}
      />
      <div className="flex flex-col w-[447px]">
        <h3
          className="text-lg/[21px] cursor-pointer"
          onClick={navigateToWebtoon}
        >
          {title}
        </h3>
        <p className="text-xs text-[#888888] mt-1">
          {authorNickname} &#183; {genre} &#183; {episodeCount}화
        </p>
        <div className="flex items-center mt-1 mb-[10px]">
          <Image
            src="/assets/images/star-1.png"
            alt="Star PNG"
            width={13}
            height={13}
          />
          <p className="text-brand-yellow text-xs ml-[3px] mt-[1px]">
            {avgStar}
          </p>
          <p className="text-[#C9C9C9] text-xs ml-[3px] mt-[1px]">
            ({commentCount})
          </p>
        </div>
        <p className="text-contentBlack text-[15px] ml-[3px]">
          {story}
        </p>
      </div>

    </div>
  );
};

export default CompletedWorkItem;
