'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import WebtoonThumbnail from './WebtoonThumbnail';
import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import './_slickCss/slick-theme.css';

interface WebtoonSliderProps {
  webtoons: IWebtoon[];
}
const WebtoonSlider: React.FC<WebtoonSliderProps> = ({ webtoons }) => {
  const [currentGroup, setCurrentGroup] = useState(0); // 그룹 단위로 관리

  const settings = {
    dots: false, // 하단 네비게이션 표시 여부
    infinite: false, // 무한 반복 여부
    speed: 500, // 슬라이드 속도
    slidesToShow: 4, // 한 화면에 표시할 그룹(열) 개수
    slidesToScroll: 4, // 스크롤할 그룹(열) 개수
    arrows: true, // 버튼 비활성화
    afterChange: (current: number) => setCurrentGroup(current / 4), // 4개씩 스크롤할 경우 그룹 계산
    responsive: [
      {
        breakpoint: 768, // 화면 크기 기준
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
    <div className="mt-3">
      <Slider {...settings}>
        {webtoons.length > 0 ? (
          webtoons.map((webtoon, index) => (
            <div key={index} className="px-2">
              <WebtoonThumbnail webtoon={webtoon} ranking={index + 1} />
            </div>
          ))
        ) : (
          <div className="flex justify-center h-[311px]">
            <p className="text-center text-red">데이터가 없습니다.</p>
          </div>
        )}
      </Slider>
      {/* 하단 진행 바 */}
      {webtoons.length > 4 && (
        <div className="left-0 w-full h-[2px] bg-gray-200 relative">
          <div
            className="h-full bg-black transition-all duration-200 absolute"
            style={{
              width: `${(1 / Math.ceil(webtoons.length / 4)) * 100}%`, // 한 그룹(4개 단위)의 너비
              left: `${(currentGroup / Math.ceil(webtoons.length / 4)) * 100}%`, // 현재 그룹의 시작 위치
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WebtoonSlider;
