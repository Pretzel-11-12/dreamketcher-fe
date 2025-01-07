'use client';
import React, { useState, useEffect } from 'react';
import TagSelector from '../../main/_component/TagSelector';

const SearchSideSection: React.FC = () => {
  return (
    <div className="flex flex-col w-[346px] pt-8 gap-4 ml-10">
      <div className="flex flex-col gap-4">
        <p>연관 검색어</p>
        <hr className="-ml-2"></hr>
        <TagSelector
          selectedTag={'로맨스'}
          categories={[
            { name: '로맨스' },
            { name: '스릴러' },
            { name: '공포' },
            { name: '액션' },
            { name: '스포츠' },
          ]}
          handleTagClick={() => {
            return;
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>추천 태그</p>
        <hr className="-ml-2"></hr>
        <TagSelector
          selectedTag={'로맨스'}
          categories={[
            { name: '로맨스' },
            { name: '스릴러' },
            { name: '공포' },
            { name: '액션' },
            { name: '스포츠' },
          ]}
          handleTagClick={() => {
            return;
          }}
        />
      </div>
    </div>
  );
};

export default SearchSideSection;
