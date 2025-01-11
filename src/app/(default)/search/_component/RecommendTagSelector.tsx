'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

interface RecommendTagSelectorProps {
  recommendTags: string[];
  handleTagClick: (RecommendTag: string) => void;
}

const RecommendTagSelector: React.FC<RecommendTagSelectorProps> = ({
  recommendTags,
  handleTagClick,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-start md:mb-0 w-full md:w-auto gap-2">
      {recommendTags.map((recommendTag, index) => (
        <button
          key={index}
          className={`flex items-center justify-center p-[8px] h-[20px] text-[12px] bg-[#f2f2f2] hover:bg-[#5474CE] text-[#888888] hover:text-white rounded-[3px] transition duration-300
            }`}
          onClick={() => handleTagClick(recommendTag)}
        >
          <span>#{recommendTag}</span>
        </button>
      ))}
    </div>
  );
};

export default RecommendTagSelector;
