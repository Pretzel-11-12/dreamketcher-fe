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
    <div className="flex flex-wrap items-center justify-start md:mb-0 w-full md:w-auto gap-1">
      {tags.map((tag) => (
        <button
          key={tag.name}
          className={`flex items-center justify-center w-[49px] h-[30px] text-[13px] rounded-[11px] transition duration-300 ${
            selectedTag === tag.name
              ? 'bg-[#5474CE] text-white'
              : 'bg-[#f2f2f2] text-[#888888] hover:bg-[#5474CE] hover:text-white'
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
