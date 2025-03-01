import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MyWebtoon } from '@/model/Webtoon';

const WorkItem: React.FC<MyWebtoon> = ({
  id,
  thumbnail,
  title,
  author,
  genre,
  episodeCount,
  avgStar,
  numOfStars,
  story,
  //tags,
}) => {
  const router = useRouter();

  function navigateToWebtoon() {
    router.push(`/webtoon/list?id=${id}`);
  }

  return (
    <div className="flex bg-white pb-6 border-b border-b-line">
      <img
        src={thumbnail}
        alt="웹툰 썸네일"
        className="w-[100px] h-[150px] rounded-lg mr-[18px] cursor-pointer"
        onClick={navigateToWebtoon}
      />

      <div className="flex flex-col justify-center">
        <h3
          onClick={navigateToWebtoon}
          className="text-base text-gray-800 mb-1 cursor-pointer"
        >
          {title}
        </h3>
        <p className="text-xs text-gray-400">
          {author} &#183; {genre} &#183; {episodeCount}화
        </p>
        <div className="flex items-center mt-1">
          <Image
            src="/assets/images/star-1.png"
            alt="Star PNG"
            width={13}
            height={13}
          />
          <p className="text-brand-yellow text-xs ml-[3px] mt-[1px]">
            {avgStar}
          </p>
          <p className="text-[#C9C9C9] text-xs ml-[2px] mt-[1px]">
            ({numOfStars})
          </p>
        </div>

        <p className="text-sm text-[#3F3F3F] mt-2">{story}</p>

        <div className="flex gap-[2px] mt-2">
          <div className="bg-brand-gray rounded-sm px-2 py-0.5 text-[#888888] text-xs">
            PURE
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkItem;
