import React from 'react';

export default function EmptyAlarmState({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-sm my-auto gap-[30px]">
      <div className="flex flex-col text-center text-[#c9c9c9] text-[18px] leading-[25px]">
        <p>새 알림이 없습니다</p>
        {(selectedCategory === '내소식' || selectedCategory === '업데이트') && (
          <p>드림캐쳐 홈에서 재밌는 웹툰을 찾아보세요.</p>
        )}
        {selectedCategory === '내작품' && (
          <p>드림캐쳐 홈에서 재밌는 웹툰을 만들어보세요.</p>
        )}
      </div>
      {(selectedCategory === '내소식' || selectedCategory === '업데이트') && (
        <a
          href="/"
          className="text-white w-[320px] text-center text-[18px] font-medium py-5 rounded-[10px] border border-1-[#fa973b] bg-[#fba250]"
        >
          드림케쳐 홈에서 웹툰 즐기기
        </a>
      )}
      {selectedCategory === '내작품' && (
        <a
          href="/creator/series"
          className="text-white w-[320px] text-center text-[18px] font-medium py-5 rounded-[10px] border border-1-[#fa973b] bg-[#fba250]"
        >
          드림케쳐 작업실 바로가기
        </a>
      )}
    </div>
  );
}
