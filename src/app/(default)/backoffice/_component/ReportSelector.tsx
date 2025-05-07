'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const categories: { name: string; path: string }[] = [
  { name: '작품 관리', path: 'webtoon' },
  { name: '에피소드 관리', path: 'episode' },
  { name: '댓글 관리', path: 'comment' },
  { name: '유저 관리', path: 'user' },
  { name: '로그', path: 'log' },
];

const ReportSelector: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string>('comment');

  useEffect(() => {
    if (pathname === '/backoffice/comment') {
      setSelectedCategory('댓글 관리');
    } else if (pathname === '/backoffice/episode') {
      setSelectedCategory('에피소드 관리');
    } else if (pathname === '/backoffice/user') {
      setSelectedCategory('유저 관리');
    } else if (pathname === '/backoffice/webtoon') {
      setSelectedCategory('작품 관리');
    } else if (pathname === '/backoffice/log') {
      setSelectedCategory('로그');
    }
  }, [pathname]);

  const handleCategoryClick = (categoryName: string, path: string) => {
    setSelectedCategory(categoryName);
    router.push(`/backoffice/${path}`);
  };

  return (
    <div className="border-b w-full border-b-line">
      <div className="flex flex-row items-center justify-between mx-auto w-[1200px] h-[55px]">
        <div className="flex items-center justify-center w-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`flex items-center justify-center w-[160px] h-[55px] text-[17px] font-medium transition duration-300 hover:bg-brand-yellow hover:text-white ${
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
      </div>
    </div>
  );
};

export default ReportSelector;
