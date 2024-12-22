import Link from 'next/link';
import SeriesCategorySelector from './_components/SeriesCategorySelector';
import SeriesSideBar from './_components/SeriesSideBar';
import SeriesList from './_components/SeriesList';

export default function CreatorMain() {
  return (
    <div className="grid grid-cols-[auto_1fr] mt-[80px] w-full h-full">
      <SeriesSideBar />
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-lg font-semibold pl-4">내 작품</span>
          <Link
            className="w-[125px] h-[39px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px]"
            href="/creator/series/new"
          >
            작품 등록
          </Link>
        </div>
        <div className="pl-4">
          <SeriesCategorySelector />
        </div>
        <SeriesList />
      </div>
    </div>
  );
}
