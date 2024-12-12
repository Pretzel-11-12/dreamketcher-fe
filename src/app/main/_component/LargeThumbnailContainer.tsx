"use client";

import React, { useState, useEffect, useRef } from "react";
import WebtoonThumbnail from "@/app/main/_component/WebtoonThumbnail";
import LargeThumbnail from "./LargeThumbnail";
import TagSelector from "./TagSelector";

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
];

interface LargeThumbnailContainerProps {
  title: string;
}

const handleTagClick = () => {
  return null;
};

const LargeThumbnailContainer: React.FC<LargeThumbnailContainerProps> = ({
  title,
}) => {
  return (
    <div className="flex flex-col text-black mt-3 gap-1">
      <p className="text-[17px]">{title}</p>
      <TagSelector
        selectedTag={"로맨스"}
        categories={[
          { name: "로맨스" },
          { name: "스릴러" },
          { name: "공포" },
          { name: "액션" },
          { name: "스포츠" },
          { name: "개그" },
          { name: "소년" },
        ]}
        handleTagClick={handleTagClick}
      />
      <div className="flex mt-3 overflow-hidden">
        {webtoonThumbnails.length > 0 ? (
          webtoonThumbnails.map((webtoon) => (
            <div key={webtoon.id}>
              <LargeThumbnail webtoon={webtoon} w={140} h={210} />
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

export default LargeThumbnailContainer;
