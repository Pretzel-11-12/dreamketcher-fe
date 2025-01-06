'use client';

import React, { useState } from 'react';

interface FilterComponentProps {
  selectedFilter: string;
  setFilter: (filter: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  selectedFilter,
  setFilter,
}) => {
  const handleClick = (selectedFilter: string) => {
    setFilter(selectedFilter);
    console.log(`${selectedFilter} 필터 선택됨`);
  };

  return (
    <div className="flex text-[#888888] text-[14px] items-center">
      {['실시간', '오늘', '이번주'].map((filter, index) => (
        <React.Fragment key={index}>
          <p
            className={`cursor-pointer ${
              filter === selectedFilter ? 'text-brand-yellow' : 'text-[#888888]'
            }`}
            onClick={() => handleClick(filter)}
          >
            {filter}
          </p>
          {index < 2 && <span className="mx-1">·</span>}
          {/* 마지막 항목에는 · 표시하지 않음 */}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FilterComponent;
