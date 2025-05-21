'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

interface TagSelectorProps {
  selectedTag: string;
  tags: { name: string }[];
  handleTagClick: (tag: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTag,
  tags,
  handleTagClick,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-start md:mb-0 w-full md:w-auto gap-[10px]">
      {tags.map((tag) => (
        <button
          key={tag.name}
          className={`flex items-center justify-center h-[26px] text-[13px] rounded-[5px] px-[10px] transition duration-300 ${
            selectedTag === tag.name
              ? 'bg-[#5474CE] border border-[#4C68B4] text-white'
              : 'bg-[#f2f2f2] text-[#888888] hover:bg-[#E9E9E9] border border-[#F3F0F0] hover:border-[#E0E0E0]'
          }`}
          onClick={() => handleTagClick(tag.name)}
        >
          <span>{tag.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TagSelector;
