'use client';

import React, { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getWebtoon } from '@/app/hooks/getWebtoon';

interface Webtoon {
  id: number;
  title: string;
  thumbnail: string;
  writer: string;
}

const BackofficeWebtoonList: React.FC = () => {
  //   const observerRef = useRef<IntersectionObserver | null>(null);
  //   const { data, fetchNextPage, hasNextPage, isLoading, isError } =
  //     useInfiniteQuery({
  //       queryKey: ['webtoons'],
  //       queryFn: getWebtoon,
  //       getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  //     });

  //   const loadMoreRef = useRef<HTMLDivElement | null>(null);

  //   React.useEffect(() => {
  //     if (!hasNextPage || !loadMoreRef.current) return;

  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         if (entries[0].isIntersecting) {
  //           fetchNextPage();
  //         }
  //       },
  //       { threshold: 1.0 }
  //     );

  //     observer.observe(loadMoreRef.current);
  //     return () => observer.disconnect();
  //   }, [fetchNextPage, hasNextPage]);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (isError) return <p>Error loading webtoons</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {/* {hasNextPage && <div ref={loadMoreRef} className="h-10 w-full"></div>} */}
    </div>
  );
};

export default BackofficeWebtoonList;
