"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface GenreSelectorProps {
  selectedGenre: string;
  categories: { name: string }[];
  handleGenreClick: (Genre: string) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({
  selectedGenre,
  categories,
  handleGenreClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-[1024px] h-[48px]">
      <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto">
        {categories.map((Genre) => (
          <button
            key={Genre.name}
            className={`flex items-center justify-center w-[85px] h-[48px] text-[15px] hover:text-brand-yellow hover:border-b border-b-brand-yellow transition duration-300 ${
              selectedGenre === Genre.name
                ? "text-brand-yellow border-b border-b-brand-yellow"
                : "text-[#888888]"
            }`}
            onClick={() => handleGenreClick(Genre.name)}
          >
            <span>{Genre.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
