import Link from "next/link";

const SeriesItem: React.FC<{}> = () => {
  return (
    <Link href={"/creator/episode"}>
      <div className="grid grid-cols-[160px_repeat(6,1fr)_80px] gap-5 items-center border-b p-4 w-full cursor-pointer text-gray-600 text-sm border-gray-400/20">
        <div className="flex flex-col gap-1 items-center">
          <div className="bg-[#DEE5EA] w-[130px] h-[150px]" />
          <span className="flex justify-center w-full">별종의 세계</span>
        </div>

        <span className="flex justify-center w-full">245</span>
        <span className="flex justify-center w-full">2024.12.26</span>
        <span className="flex justify-center w-full">2024.10.26</span>
        <span className="flex justify-center w-full">1,356</span>
        <span className="flex justify-center w-full">663</span>
        <span className="flex justify-center w-full">663</span>

        <button>
          <span className="mdi mdi-dots-horizontal"></span>
        </button>
      </div>
    </Link>
  );
};

export default SeriesItem;
