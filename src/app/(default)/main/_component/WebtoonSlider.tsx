'use client';

import React from 'react';
import Slider from 'react-slick';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import WebtoonThumbnail from './WebtoonThumbnail';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface WebtoonSliderProps {
  webtoons: IWebtoon[];
}
const WebtoonSlider: React.FC<WebtoonSliderProps> = ({ webtoons }) => {
  const settings = {
    dots: false, // 하단 네비게이션 표시 여부
    infinite: false, // 무한 반복 여부
    speed: 500, // 슬라이드 속도
    slidesToShow: 2, // 한 화면에 표시할 그룹(열) 개수
    slidesToScroll: 2, // 스크롤할 그룹(열) 개수
    arrows: false, // 버튼 비활성화
    responsive: [
      {
        breakpoint: 768, // 화면 크기 기준
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const groupedWebtoons = [];
  for (let i = 0; i < webtoons.length; i += 2) {
    groupedWebtoons.push(webtoons.slice(i, i + 2));
  }

  return (
    <div className="mt-3">
      <Slider {...settings}>
        {groupedWebtoons.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-4">
            {group.map((webtoon, i) => {
              const ranking = groupIndex * 2 + i + 1;
              return (
                <div key={i} className="px-2">
                  <WebtoonThumbnail webtoon={webtoon} ranking={ranking} />
                </div>
              );
            })}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WebtoonSlider;
