"use client";

import React, { useState, useEffect, useRef } from "react";
import WebtoonThumbnail from "@/app/main/_component/WebtoonThumbnail";

interface WebtoonThumbnailData {
  id: number;
  image: string;
  title: string;
  writer: string;
  episodeCount: number;
  averageRating: number;
  stars: number;
}

const webtoonThumbnails: WebtoonThumbnailData[] = [
  {
    id: 1,
    image: "/assets/images/webtoonthumbnail-1.jpg",
    title: "이런 영웅은 싫어",
    writer: "삼촌",
    episodeCount: 294,
    averageRating: 4.9,
    stars: 200,
  },
  {
    id: 2,
    image: "/assets/images/thumbnail-2.jpg",
    title: "사변괴담",
    writer: "강태진",
    episodeCount: 4,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 3,
    image: "/assets/images/thumbnail-3.jpg",
    title: "귀곡의 문",
    writer: "Alice Lee",
    episodeCount: 189,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 4,
    image: "/assets/images/thumbnail-4.jpg",
    title: "유부감자",
    writer: "감자",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
];

interface ThumbnailContainerProps {
  title: string;
}

const ThumbnailContainer: React.FC<ThumbnailContainerProps> = ({ title }) => {
  return (
    <div className="flex flex-col text-black">
      <div className="flex text-[17px] items-center gap-2 justify-between p-3">
        <div className="flex items-center gap-2">
          <p>{title}</p>
          <div className="flex text-[#888888] text-[14px]">
            <p className="text-brand-yellow mr-1">실시간</p>
            <p> · 오늘 · 이번주</p>
          </div>
        </div>
        <p className="text-[14px] text-[#888888]">더보기</p>
      </div>
      <div className="grid grid-cols-2 mt-3 gap-y-8">
        {webtoonThumbnails.length > 0 ? (
          webtoonThumbnails.map((webtoon) => (
            <div key={webtoon.id}>
              <WebtoonThumbnail webtoon={webtoon} />
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <div className="w-[187px] h-[171px]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailContainer;
