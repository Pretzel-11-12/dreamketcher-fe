"use client";

import useGenreStore from "@/app/store/genreStore";

const genres: { name: string; param: string }[] = [
  { name: "추천", param: "recommend" },
  { name: "로맨스", param: "romance" },
  { name: "판타지", param: "fantasy" },
  { name: "무협", param: "martial-arts" },
  { name: "일상", param: "daily-life" },
  { name: "스릴러", param: "thriller" },
  { name: "공포", param: "horror" },
  { name: "액션", param: "action" },
  { name: "스포츠", param: "sports" },
  { name: "개그", param: "comedy" },
  { name: "소년", param: "shounen" },
];

const GenreSelector: React.FC = () => {
  const { selectedGenre, setSelectedGenre } = useGenreStore();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-[1024px] h-[48px]">
      <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto">
        {genres.map((genre) => (
          <button
            key={genre.name}
            className={`flex items-center justify-center w-[85px] h-[48px] text-[15px] hover:text-brand-yellow hover:border-b border-b-brand-yellow transition duration-300 ${
              selectedGenre === genre.name
                ? "text-brand-yellow border-b border-b-brand-yellow"
                : "text-[#888888]"
            }`}
            onClick={() => setSelectedGenre(genre.name)}
          >
            <span>{genre.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
