"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  w: number;
  h: number;
};

const LargeThumbnail: React.FC<LargeThumbnailProps> = ({ webtoon, w, h }) => {
  const router = useRouter();
  function tempClickHandler() {
    router.push(`/webtoon/list`);
  }
  return (
    <div
      className="flex flex-col cursor-pointer"
      style={{ width: `${w}px`, height: "308px" }}
      onClick={tempClickHandler}
    >
      <Image
        src={webtoon.image}
        alt="Webtoon thumbnail image"
        width={w - 9}
        height={h}
      />
      <div className="flex flex-col text-[12px]">
        <p className="text-[16px] break-words">{webtoon.title}</p>
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
