import EpisodeItem from "./EpisodeItem";

const items = [{}, {}, {}];
const headers = [
  "번호",
  "썸네일",
  "제목",
  "연령가",
  "게시일",
  "조회수",
  "댓글",
  "좋아요",
  "옵션",
];

const EpisodeList: React.FC<{}> = () => {
  return (
    <>
      <div className="grid grid-cols-[repeat(8,1fr)_80px] items-center px-4 text-sm gap-5 border-b py-2 text-gray-500 border-gray-400/20 bg-brand-gray/60">
        {headers.map((item) => (
          <div className="flex justify-center w-full">{item}</div>
        ))}
      </div>
      {items.map((item) => (
        <EpisodeItem />
      ))}
    </>
  );
};

export default EpisodeList;
