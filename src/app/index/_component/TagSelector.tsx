"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface TagSelectorProps {
  selectedTag: string;
  categories: { name: string }[];
  handleTagClick: (Tag: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTag,
  categories,
  handleTagClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row mx-auto w-full h-[30px]">
      <div className="flex flex-wrap items-center justify-start md:mb-0 w-full md:w-auto gap-1">
        {categories.map((Tag) => (
          <button
            key={Tag.name}
            className={`flex items-center justify-center w-[49px] h-[30px] text-[13px] bg-[#f2f2f2] hover:bg-[#5474CE] text-[#888888] hover:text-white rounded-[11px] transition duration-300 ${
              selectedTag === Tag.name ? "bg-[#5474CE]" : "text-white"
            }`}
            onClick={() => handleTagClick(Tag.name)}
          >
            <span>{Tag.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
