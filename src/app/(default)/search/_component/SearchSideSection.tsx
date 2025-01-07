'use client';
import React, { useState, useEffect } from 'react';

const SearchSideSection: React.FC = () => {
  return (
    <div className="flex flex-col w-[346px] pt-8 gap-1 ml-2">
      <p>연관 검색어</p>
      <hr className="-ml-2"></hr>
      <div className="flex flex-col gap-4">
        <p>추천 태그</p>
        <hr className="-ml-2"></hr>
      </div>
    </div>
  );
};

export default SearchSideSection;
