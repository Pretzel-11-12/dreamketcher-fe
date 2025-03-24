'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import WebtoonThumbnail from './WebtoonThumbnail';

interface WebtoonSliderProps {
  webtoons: IWebtoon[];
}

const CustomWebtoonSlider: React.FC<WebtoonSliderProps> = ({ webtoons }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY * 0.5;
    };

    slider.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      slider.removeEventListener('wheel', preventScroll);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft ?? 0));
    setScrollLeft(sliderRef.current?.scrollLeft ?? 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft ?? 0);
    const walk = x - startX;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-[870px]">
      <div
        ref={sliderRef}
        className="flex gap-[30px] overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:h-[2px] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100 pb-[23px]"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollBehavior: 'smooth',
          transition: 'all 0.2s ease-out',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {webtoons.length > 0 ? (
          webtoons.map((webtoon, index) => (
            <div key={index} className="flex-shrink-0 snap-start">
              <WebtoonThumbnail webtoon={webtoon} ranking={index + 1} />
            </div>
          ))
        ) : (
          <div className="flex h-[311px]">
            <p className="text-red">데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomWebtoonSlider;
