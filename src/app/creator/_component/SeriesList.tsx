import SeriesItem from "./SeriesItem";

const items = [{}, {}, {}];
const headers = [
  "작품",
  "회차 수",
  "업데이트",
  "연재 시작일",
  "조회수",
  "총 댓글",
  "관심웹툰",
  "옵션",
];

const SeriesList: React.FC<{}> = () => {
  return (
    <>
      <div className="grid grid-cols-[160px_repeat(6,1fr)_80px] items-center px-4 text-sm gap-5 border-b py-2 text-gray-500 border-gray-400/20 bg-brand-gray/60">
        {headers.map((item) => (
          <div className="flex justify-center w-full">{item}</div>
        ))}
      </div>
      {items.map((item) => (
        <SeriesItem />
      ))}
    </>
  );
};

export default SeriesList;
