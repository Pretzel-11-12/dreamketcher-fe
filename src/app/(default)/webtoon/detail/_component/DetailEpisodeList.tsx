'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Episode = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type DetailEpisodeListProps = {
  episodeList: Episode[];
  isMenuOpen: boolean;
};

export default function DetailEpisodeList({
  episodeList,
  isMenuOpen,
}: DetailEpisodeListProps) {
  return (
    <div
      className={`
    w-full fixed bottom-[50px] bg-white border-[#f2f2f2]
    transition-all duration-300 ease-in-out
    overflow-hidden
    shadow-[0_-3px_3px_0_rgba(222,222,222,0.11)]
    ${isMenuOpen ? 'max-h-96 border' : 'max-h-0'}
  `}
    >
      <div className="max-w-[720px] mx-auto flex gap-[10px] items-center justify-between h-[139px] py-[15px]">
        <Image
          src="/assets/icon/arrow-up.svg"
          alt="rightArrow"
          width={24}
          height={24}
          className="w-6 h-6 cursor-pointer -rotate-90"
        />
        {episodeList.map((episode) => (
          <div key={episode.id}>
            <img
              src={episode.image}
              alt={episode.title}
              className="w-[120px] h-[72px]"
            />
            <p className="text-[14px] text-[#282828] hover:text-brand-yellow mt-[10px]">
              {episode.id}화 - {episode.title}
            </p>
          </div>
        ))}
        <Image
          src="/assets/icon/arrow-up.svg"
          alt="rightArrow"
          width={24}
          height={24}
          className="w-6 h-6 cursor-pointer rotate-90"
        />
      </div>
    </div>
  );
}
