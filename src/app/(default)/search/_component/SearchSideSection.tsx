'use client';
import React, { useState, useEffect } from 'react';
import TagSelector from '../../main/_component/TagSelector';
import KeywordSelector from './KeywordSelector';
import RecommendTagSelector from './RecommendTagSelector';

interface SearchSideSectionProps {
  searchKeywords: string[];
  recommendTags: string[];
}

const SearchSideSection: React.FC<SearchSideSectionProps> = ({
  searchKeywords,
  recommendTags,
}) => {
  return (
    <div className="flex flex-col w-[346px] pt-8 gap-4 ml-10">
      <div className="flex flex-col gap-4">
        <p>연관 검색어</p>
        <hr className="-ml-2"></hr>
        <KeywordSelector
          keywords={searchKeywords}
          handleKeywordClick={() => {
            return;
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>추천 태그</p>
        <hr className="-ml-2"></hr>
        <RecommendTagSelector
          recommendTags={recommendTags}
          handleTagClick={() => {
            return;
          }}
        />
      </div>
    </div>
  );
};

export default SearchSideSection;
