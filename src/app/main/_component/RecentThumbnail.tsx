"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Button from "@/app/_component/Button";

interface webtoonData {
  id: number;
  image: string;
  title: string;
  writer: string;
  episodeCount: number;
  averageRating: number;
  stars: number;
}

type RecentThumbnailProps = {
  webtoon: webtoonData;
};

const RecentThumbnail: React.FC<RecentThumbnailProps> = ({ webtoon }) => {
  const router = useRouter();
  function tempClickHandler() {
    router.push(`/webtoon/list`);
  }
  return (
    <div
      className="flex flex-col w-[149px] h-[308px] cursor-pointer"
      onClick={tempClickHandler}
    >
      <Image
        src={webtoon.image}
        alt="Webtoon thumbnail image"
        width={140}
        height={210}
      />
      <div className="flex flex-col text-[12px]">
        <p className="text-[16px]">{webtoon.title}</p>
        <p className="text-[#888888] mb-2">
          {webtoon.writer} · {webtoon.episodeCount}화
        </p>
      </div>
      <Link
        className="w-[140px] h-[43px] flex items-center justify-center bg-brand-yellow text-white text-[14px] rounded-[5px]"
        href="/uploadPage"
      >
        36화 이어읽기
      </Link>
    </div>
  );
};

export default RecentThumbnail;
