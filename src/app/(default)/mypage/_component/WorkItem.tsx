import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface WorkItemProps {
  id: number;
  image: string;
  title: string;
  writer: string;
  genre: string;
  episodes: number;
  rating: number;
  comments: number;
  description: string;
  tags: string[];
}

const WorkItem: React.FC<WorkItemProps> = ({
  id,
  image,
  title,
  writer,
  genre,
  episodes,
  rating,
  comments,
  description,
  tags,
}) => {
  const router = useRouter();

  function navigateToWebtoon() {
    router.push('/webtoon/list');
  }

  return (
    <div className="flex bg-white pb-6 border-b border-b-line">
      <img
        src={image}
        alt="웹툰 썸네일"
        className="w-[100px] h-[150px] rounded-lg mr-6 cursor-pointer"
        onClick={navigateToWebtoon}
      />

      <div className="flex flex-col justify-between">
        <h3
          onClick={navigateToWebtoon}
          className="text-base text-gray-800 mb-1 cursor-pointer"
        >
          {title}
        </h3>
        <p className="text-xs text-gray-400">
          {writer} &#183; {genre} &#183; {episodes}화
        </p>
        <div className="flex items-center mt-1">
          <Image
            src="/assets/images/star-1.png"
            alt="Star PNG"
            width={13}
            height={13}
          />
          <p className="text-brand-yellow text-xs ml-[3px] mt-[1px]">
            {rating}
          </p>
          <p className="text-[#C9C9C9] text-xs ml-[2px] mt-[1px]">
            ({comments})
          </p>
        </div>

        <p className="text-sm text-[#3F3F3F] mt-2">{description}</p>

        <div className="flex gap-[2px] mt-2">
          {tags?.map((tag, i) => (
            <div
              key={i}
              className="bg-brand-gray rounded-sm px-2 py-0.5 text-[#888888] text-xs"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkItem;
