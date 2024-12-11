"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

interface webtoonData {
  id: number;
  image: string;
  title: string;
  writer: string;
  episodeCount: number;
  averageRating: number;
  stars: number;
}

type LargeThumbnailProps = {
  webtoon: webtoonData;
};

const LargeThumbnail: React.FC<LargeThumbnailProps> = ({ webtoon }) => {
  return (
    <div className="flex flex-col w-[149px] h-[308px] cursor-pointer">
      <Image
        src={webtoon.image}
        alt="Webtoon thumbnail image"
        width={140}
        height={210}
      />
      <div className="flex flex-col text-[12px]">
        <p className="text-[16px]">{webtoon.title}</p>
        <p className="text-[#888888]">
          {webtoon.writer} · {webtoon.episodeCount}화
        </p>
        <div className="flex items-center gap-1">
          <Image
            src="/assets/images/star-1.png"
            alt="Star PNG"
            width={13}
            height={13}
            style={{ height: "13px" }} // CSS로 높이 강제
          />
          <p className="text-brand-yellow">{webtoon.averageRating}</p>
          <p className="text-[#888888]">({webtoon.stars})</p>
        </div>
      </div>
    </div>
  );
};

export default LargeThumbnail;
