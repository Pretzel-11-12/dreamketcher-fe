'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { getSearchResult } from '@/app/hooks/getSearchResult';

const SearchPage: React.FC = () => {
  const router = useRouter();

  const { keyword } = router.query;
  const safeKeyword = typeof keyword === 'string' ? keyword : '';

  const { data, isLoading, isError } = useQuery<IWebtoon[]>({
    queryKey: ['webtoons', 'search', keyword],
    queryFn: () => getSearchResult(safeKeyword),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching search results</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {data?.map((webtoon) => (
        <div key={webtoon.id} className="border p-2">
          <img
            src={webtoon.thumbnail}
            alt={webtoon.title}
            className="w-full h-auto"
          />
          <h3 className="text-lg font-bold mt-2">{webtoon.title}</h3>
          <p className="text-sm text-gray-600">{webtoon.writer}</p>
        </div>
      ))}
    </div>
  );
};

const SearchButton: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search webtoons..."
        className="border p-2 w-full max-w-md"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export { SearchPage, SearchButton };
