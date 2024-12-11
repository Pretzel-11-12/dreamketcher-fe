"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface CategorySelectorProps {
  selectedCategory: string;
  categories: { name: string }[];
  handleCategoryClick: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  categories,
  handleCategoryClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-[1024px] h-[55px]">
      <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`flex items-center justify-center w-[125px] h-[55px] text-[16px] hover:bg-brand-yellow hover:text-white transition duration-300 ${
              selectedCategory === category.name
                ? "bg-brand-yellow text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-center md:justify-end w-full md:w-auto">
        <Link
          className="w-[125px] h-[39px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px]"
          href="/uploadPage"
        >
          작품 등록
        </Link>
      </div>
    </div>
  );
};

export default CategorySelector;
