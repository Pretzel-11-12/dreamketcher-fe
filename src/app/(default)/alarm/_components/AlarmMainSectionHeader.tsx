'use client';

import React, { useState } from 'react';

const categories: { name: string }[] = [
  { name: '전체' },
  { name: '내소식' },
  { name: '내작품' },
  { name: '업데이트' },
];

interface AlarmMainSectionHeaderProps {
  markAllAsRead: () => void;
  clearAllAlarms: () => void;
}

export default function AlarmMainSectionHeader({
  markAllAsRead,
  clearAllAlarms,
}: AlarmMainSectionHeaderProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between mx-auto h-[33px]">
      <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto gap-[10px]">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`flex items-center justify-center w-[85px] h-[33px] text-[14px] text-[#c9c9c9] rounded-[100px] hover:bg-brand-yellow hover:text-white transition duration-300 ${
              selectedCategory === category.name
                ? 'bg-brand-yellow text-white border border-[#FA973B]'
                : 'bg-line text-[#c9c9c9]'
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-[6px] items-center">
        <button
          className="p-2 rounded-[5px] hover:bg-[#fba250]/20 text-basicGray hover:text-brand-yellow"
          onClick={clearAllAlarms}
        >
          전체 삭제
        </button>
        <div className="w-[1px] h-[14px] bg-[#f2f2f2]"></div>
        <button
          className="p-2 rounded-[5px] hover:bg-[#fba250]/20 text-basicGray hover:text-brand-yellow"
          onClick={markAllAsRead}
        >
          모두 읽음으로 처리
        </button>
      </div>
    </div>
  );
}
