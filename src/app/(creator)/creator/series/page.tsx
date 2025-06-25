import SeriesSideBar from './_components/SeriesSideBar';
import SeriesList from './_components/SeriesList';
import SeriesCategorySelector from './_components/SeriesCategorySelector';
import Header from '../_component/Header';

export default function CreatorMain() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grid grid-cols-[auto_1fr] mt-[70px] w-full h-full border-r border-[#F2F2F2] bg-bgGray">
        <SeriesSideBar />
        <div className="flex flex-col mt-2.5">
          <div className="flex items-center pt-[30px] px-[30px] gap-2">
            <span className="text-[20px] leading-[18px] font-medium text-titleBlack">
              내 작품
            </span>
            <SeriesCategorySelector />
          </div>
          <SeriesList />
        </div>
      </div>
    </div>
  );
}
