import { FavoriteWebtoon } from '@/model/Webtoon';
import WebtoonItem from '@/app/(default)/mypage/storage/bookShelf/[id]/_component/WebtoonItem';

const WebtoonList = ({ favoriteWebtoons }: { favoriteWebtoons: FavoriteWebtoon[] }) => {
  if (favoriteWebtoons.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-center text-[#888888] text-lg mt-[100px] font-medium">
          아직 작품이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-[20px] [grid-template-columns:repeat(auto-fit,minmax(425px,1fr))]">
      {favoriteWebtoons.map((favoriteWebtoon) => (
        <WebtoonItem key={favoriteWebtoon.webtoonId} {...favoriteWebtoon} />
      ))}
    </div>
  );
};

export default WebtoonList;
