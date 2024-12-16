import Link from "next/link";

const EpisodeItem: React.FC<{}> = () => {
  return (
    <div className="grid grid-cols-[repeat(8,1fr)_80px] gap-5 items-center border-b p-4 w-full text-gray-600 text-sm border-gray-400/20">
      <span className="flex justify-center w-full">1</span>
      <div className="flex flex-col gap-1 items-center">
        <div className="bg-[#DEE5EA] w-[120px] h-[100px]" />
      </div>

      <span className="flex justify-center w-full">별종의 세계</span>
      <span className="flex justify-center w-full">전체</span>
      <span className="flex justify-center w-full">2024.12.26</span>
      <span className="flex justify-center w-full">1,356</span>
      <span className="flex justify-center w-full">663</span>
      <span className="flex justify-center w-full">663</span>

      <Link href={"/creator/episode/new"}>
        <button>
          <span className="mdi mdi-dots-horizontal"></span>
        </button>
      </Link>
    </div>
  );
};

export default EpisodeItem;
