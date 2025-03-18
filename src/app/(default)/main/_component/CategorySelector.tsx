'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const categories: { name: string; path: string }[] = [
  { name: '전체', path: '' },
  { name: '신작', path: 'new' },
  { name: '완결', path: 'finish' },
];

const CategorySelector: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (pathname === '/main/finish') {
      setSelectedCategory('완결');
    } else if (pathname === '/main/new') {
      setSelectedCategory('신작');
    } else if (pathname === '/main' || pathname.startsWith('/main/')) {
      setSelectedCategory('전체');
    }
  }, [pathname]);

  const handleCategoryClick = (categoryName: string, path: string) => {
    setSelectedCategory(categoryName);
    router.push(`/main/${path}`);
  };

  return (
    <div className="border-b w-[100vw] border-b-line">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-[1200px] h-[55px]">
        <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`flex items-center justify-center w-[125px] h-[55px] text-[17px] font-medium transition duration-300 ${
                selectedCategory === category.name
                  ? 'bg-brand-yellow text-white'
                  : 'bg-white text-[#3f3f3f]'
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
              className="mr-[5px]"
            />
            작업실
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
