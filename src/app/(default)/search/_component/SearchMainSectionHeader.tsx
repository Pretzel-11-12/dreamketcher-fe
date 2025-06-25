'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Dropdown from '@/app/_component/Dropdown';

const categories: { name: string }[] = [
  { name: '전체' },
  { name: '연재' },
  { name: '완결' },
];

const SearchMainSectionHeader: React.FC<{ count: number }> = ({ count }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto h-[33px]">
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
              <span>
                {category.name} ({count})
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchMainSectionHeader;
