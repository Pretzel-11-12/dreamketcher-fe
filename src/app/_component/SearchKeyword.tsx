'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const SearchKeyword: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 경로가 변경될 때마다 실행
  useEffect(() => {
    // 현재 경로가 검색 페이지이고 검색 파라미터가 있다면 keyword 유지
    if (pathname === '/search' && searchParams.get('keyword')) {
      setKeyword(searchParams.get('keyword') || '');
    } else {
      // 그 외의 경우 keyword 초기화
      setKeyword('');
    }
  }, [pathname, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="웹툰명 또는 작가명을 입력해주세요."
        className="w-[263px] h-[34px] px-4 bg-line rounded-[100px] text-[13px] text-black
         border border-line
         focus:border-brand-yellow focus:bg-white focus:outline-none
         transition duration-300"
      />
      <button
        onClick={handleSearch}
        className="fixed ml-[210px] text-white px-4 py-2 rounded"
      >
        <Image
          src="/assets/icon/scope.svg"
          alt="search button"
          width={28}
          height={28}
          className="cursor-pointer"
        />
      </button>
    </form>
  );
};

export default SearchKeyword;
