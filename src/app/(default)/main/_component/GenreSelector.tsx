'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { genres } from '@/constants/genres';

const GenreSelector: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentGenre = searchParams.get('genre') || 'RECOMMENDED';

  const handleGenreClick = (genre: string) => {
    // 현재 경로가 main이 아니면 main으로 이동
    if (!pathname.includes('/main')) {
      router.push(`/main/default?genre=${genre}`);
      return;
    }
    // URL의 'genre' 쿼리 파라미터를 업데이트
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('genre', genre);

    // URL 변경
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="border-b w-full border-b-line min-w-[900px]">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-[1200px] h-[48px]">
        <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto">
          {genres.map((genre) => (
            <button
              key={genre.param}
              className={`flex items-center justify-center w-[85px] h-[48px] text-[15px] border-b-brand-yellow transition duration-300 ${
                currentGenre === genre.param
                  ? 'text-brand-yellow border-b-2 border-b-brand-yellow font-semibold'
                  : 'text-[#888888]'
              }`}
              onClick={() => handleGenreClick(genre.param)}
            >
              <span>{genre.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreSelector;
