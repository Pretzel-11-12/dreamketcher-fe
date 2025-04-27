import { MyWebtoon } from '@/model/Webtoon';
import FavoriteWebtoonItem from '@/app/(default)/userpage/[id]/_component/FavoriteWebtoonItem';

const FavoriteWebtoon = ({ works }: { works: MyWebtoon[] }) => {
  if (works.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-center text-[#888888] text-lg mt-[100px] font-medium">
          아직 서재에 작품이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 mt-[10px]">
      {works.map((work) => (
        <FavoriteWebtoonItem
          key={work.id}
          {...work}
        />
      ))}
    </div>
  );
};

export default FavoriteWebtoon;
