'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchKeyword: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?keyword=${encodeURIComponent(keyword || '')}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="웹툰명 또는 작가명을 입력해주세요."
        className="w-[263px] h-[34px] p-2 bg-line rounded-[100px] text-[13px]"
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
