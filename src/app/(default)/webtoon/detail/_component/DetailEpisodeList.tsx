'use client';

import { useEffect, useState } from 'react';

type Episode = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type DetailEpisodeListProps = {
  episodeList: Episode[];
  isDisplay: boolean;
  isMenuOpen: boolean;
  setMenuOpen: (isMenuOpen: boolean) => void;
};

export default function DetailEpisodeList({
  episodeList,
  isDisplay,
  isMenuOpen,
  setMenuOpen,
}: DetailEpisodeListProps) {
  useEffect(() => {
    if (!isDisplay) {
      setMenuOpen(false);
    }
  }, [isDisplay]);

  return (
    <>
      {isMenuOpen && (
        <div className="w-full fixed bottom-[50px] bg-white border border-1 border-[#f2f2f2]">
          <div className="max-w-[720px] mx-auto flex gap-[10px] items-center justify-between h-[139px] p-[15px]">
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
          </div>
        </div>
      )}
    </>
  );
}
