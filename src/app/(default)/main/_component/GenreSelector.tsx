'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const genres: { name: string; param: string }[] = [
  { name: '추천', param: 'RECOMMENDED' },
  { name: '로맨스', param: 'PURE' },
  { name: '판타지', param: 'FANTASY' },
  { name: '무협', param: 'HISTORICAL' },
  { name: '일상', param: 'DAILY' },
  { name: '스릴러', param: 'THRILL' },
  { name: '공포', param: 'HORROR' },
  { name: '액션', param: 'ACTION' },
  { name: '스포츠', param: 'SPORTS' },
  { name: '개그', param: 'COMIC' },
  { name: '소년', param: 'SHOUNEN' },
];

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
    <div className="border-b w-[100vw] border-b-line">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-[1200px] h-[48px]">
        <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto">
          {genres.map((genre) => (
            <button
              key={genre.param}
              className={`flex items-center justify-center w-[85px] h-[48px] text-[15px] border-b-brand-yellow transition duration-300 ${
                currentGenre === genre.param
                  ? 'text-brand-yellow border-b border-b-brand-yellow'
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
