"use client";

import React, { useState, useEffect, useRef } from "react";
import LargeThumbnail from "./LargeThumbnail";

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
    image: "/assets/images/thumbnail-large-3.jpg",
    title: "The Chronicles of Dreams",
    writer: "Jane Doe",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 2,
    image: "/assets/images/thumbnail-large-4.jpg",
    title: "Mystic Adventures",
    writer: "John Smith",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 3,
    image: "/assets/images/thumbnail-large-5.jpg",
    title: "Urban Fantasy",
    writer: "Alice Lee",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 4,
    image: "/assets/images/thumbnail-large-6.jpg",
    title: "Hero's Journey",
    writer: "Mike Johnson",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 5,
    image: "/assets/images/thumbnail-large-7.jpg",
    title: "이야기의 조각",
    writer: "판톰",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 6,
    image: "/assets/images/thumbnail-large-3.jpg",
    title: "The Chronicles of Dreams",
    writer: "Jane Doe",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 7,
    image: "/assets/images/thumbnail-large-4.jpg",
    title: "Mystic Adventures",
    writer: "John Smith",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 8,
    image: "/assets/images/thumbnail-large-5.jpg",
    title: "Urban Fantasy",
    writer: "Alice Lee",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 9,
    image: "/assets/images/thumbnail-large-6.jpg",
    title: "Hero's Journey",
    writer: "Mike Johnson",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 10,
    image: "/assets/images/thumbnail-large-7.jpg",
    title: "이야기의 조각",
    writer: "판톰",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 11,
    image: "/assets/images/thumbnail-large-3.jpg",
    title: "The Chronicles of Dreams",
    writer: "Jane Doe",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 12,
    image: "/assets/images/thumbnail-large-4.jpg",
    title: "Mystic Adventures",
    writer: "John Smith",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 13,
    image: "/assets/images/thumbnail-large-5.jpg",
    title: "Urban Fantasy",
    writer: "Alice Lee",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 14,
    image: "/assets/images/thumbnail-large-6.jpg",
    title: "Hero's Journey",
    writer: "Mike Johnson",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 15,
    image: "/assets/images/thumbnail-large-7.jpg",
    title: "이야기의 조각",
    writer: "판톰",
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
];

interface DetailThumbnailContainerProps {
  title: string;
}

const DetailThumbnailContainer: React.FC<DetailThumbnailContainerProps> = ({
  title,
}) => {
  return (
    <div className="flex flex-col text-black mt-3 gap-1">
      <div className="flex text-[17px] items-center gap-2">
        <p>{title}</p>
        <div className="flex text-[#888888] text-[14px]">
          <p className="text-brand-yellow mr-1">최신순</p>
          <p> · 좋아요순 · 별점순</p>
        </div>
      </div>
      <div className="flex flex-wrap mt-3 gap-1">
        {webtoonThumbnails.length > 0 ? (
          webtoonThumbnails.map((webtoon) => (
            <div key={webtoon.id}>
              <LargeThumbnail webtoon={webtoon} w={130} h={252} />
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

export default DetailThumbnailContainer;
