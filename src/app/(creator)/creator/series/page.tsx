import Link from 'next/link';
import SeriesSideBar from './_components/SeriesSideBar';
import SeriesList from './_components/SeriesList';

export default function CreatorMain() {
  return (
    <div className="grid grid-cols-[auto_1fr] mt-[70px] w-full h-full border-r border-[#F2F2F2]">
      <SeriesSideBar />
      <div className="flex flex-col mt-2.5">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[18px] font-medium pl-4 leading-[24px]">
            내 작품
          </span>
          <Link
            className="w-[125px] h-[39px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px]"
            href="/creator/series/new"
          >
            작품 등록
          </Link>
        </div>

        <SeriesList />
      </div>
    </div>
  );
}
