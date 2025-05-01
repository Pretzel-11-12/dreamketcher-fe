'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
interface KeywordSelectorProps {
  keywords: string[];
}

const KeywordSelector: React.FC<KeywordSelectorProps> = ({ keywords }) => {
  const router = useRouter();

  function handleKeywordClick(keyword: string) {
    router.push(`/search?keyword=${keyword}`);
  }

  return (
    <div className="flex flex-wrap items-center justify-start md:mb-0 w-full md:w-auto gap-2">
      {keywords.map((keyword, index) => (
        <button
          key={index}
          className={`flex items-center justify-center p-[5px] h-[20px] text-[12px] bg-[#f2f2f2] hover:bg-[#5474CE] text-[#888888] hover:text-white rounded-[3px] transition duration-300
            }`}
          onClick={() => handleKeywordClick(keyword)}
        >
          <span>{keyword}</span>
        </button>
      ))}
    </div>
  );
};

export default KeywordSelector;
