'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import WebtoonThumbnail from './WebtoonThumbnail';
import 'slick-carousel/slick/slick.css';
import './_slickCss/slick-theme.css';

interface WebtoonSliderProps {
  webtoons: IWebtoon[];
}

const WebtoonSlider: React.FC<WebtoonSliderProps> = ({ webtoons }) => {
  const [currentGroup, setCurrentGroup] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    afterChange: (current: number) => setCurrentGroup(current / 4),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          afterChange: (current: number) => setCurrentGroup(current),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          afterChange: (current: number) => setCurrentGroup(current),
        },
      },
    ],
  };

  return (
    <div className="w-[870px] flex flex-col gap-[25px]">
      <Slider {...settings}>
        {webtoons.length > 0 ? (
          webtoons.map((webtoon, index) => (
            <div key={index} className="pl-[30px] first:pl-0">
              <WebtoonThumbnail webtoon={webtoon} ranking={index + 1} />
            </div>
          ))
        ) : (
          <div className="flex h-[311px]">
            <p className="text-red">데이터가 없습니다.</p>
          </div>
        )}
      </Slider>
      {/* 하단 진행 바 */}
      {webtoons.length > 4 && (
        <div className="left-0 w-full h-[2px] bg-gray-200 relative">
          <div
            className="h-full bg-black transition-all duration-200 absolute"
            style={{
              width: `${(1 / (webtoons.length / 4)) * 100}%`, // 한 그룹(4개 단위)의 너비
              left: `${(currentGroup / (webtoons.length / 4)) * 100}%`, // 현재 그룹의 시작 위치
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WebtoonSlider;
