import Link from 'next/link';

const EmptyRecentWebtoon = () => {
  return (
    <div className="box-border flex flex-col items-center p-[20px_15px] gap-[9px] w-[282px] h-[153px] bg-white border border-[#f2f2f2] rounded-[10px]">
      <p className="text-[#282828] text-[14px] font-medium text-center">
        드림케쳐에서 자유롭게 웹툰을 연재하세요
      </p>
      <p className="text-[#3f3f3f] text-[13px] whitespace-pre-line text-center">
        {
          '나만의 웹툰을 세상에 선보이고 싶다면?\n창작자들을 위한 드림케쳐에서 시작해보세요.'
        }
      </p>
      <div className="flex justify-center md:justify-end w-full md:w-auto mt-[4px]">
        <Link
          className="w-[252px] h-[36px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px] text-[14px]"
          href="/main"
        >
          드림케쳐 더 알아보기
        </Link>
      </div>
    </div>
  );
};

export default EmptyRecentWebtoon;
