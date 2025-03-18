'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

interface ListCategorySelectorProps {
  selectedCategory: '전체' | '신작' | '완결'; // props로 받을 카테고리
}

const categories: { name: string; path: string }[] = [
  { name: '전체', path: '' },
  { name: '신작', path: 'new' },
  { name: '완결', path: 'finish' },
];

const ListCategorySelector: React.FC<ListCategorySelectorProps> = ({
  selectedCategory,
}) => {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string, path: string) => {
    router.push(`/main/${path}`);
  };

  return (
    <div className="border-b w-full border-b-line">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-[1200px] h-[55px]">
        <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`flex items-center justify-center w-[125px] h-[55px] text-[16px] transition duration-300 ${
                selectedCategory === category.name
                  ? 'bg-brand-yellow text-white'
                  : 'bg-white text-black'
              }
              `}
              onClick={() => handleCategoryClick(category.name, category.path)}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <Link
            className="w-[125px] h-[39px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px]"
            href="/creator/series"
          >
            <Image
              src={'/assets/icon/studio.png'}
              alt="Studio Icon"
              width={20}
              height={20}
            />
            작업실
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCategorySelector;
