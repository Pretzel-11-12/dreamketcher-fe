'use client';
import DefaultImage from '@/app/_component/DefaultImage';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import Link from 'next/link';

const SeriesInfo: React.FC<fetchWebtoonDetail.Model.WebtoonDetailUnit> = (
  data
) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-[14px]">
      <DefaultImage
        src={data.webtoonThumbnail}
        alt={data.webtoonTitle}
        width={165}
        height={247}
      />

      <div className="flex flex-col">
        <span className="text-titleBlack text-[20px] font-[500]">
          {data.webtoonTitle}
        </span>

        <span className="text-contentBlack text-[14px] font-normal">
          {data.webtoonStory}
        </span>
      </div>

      <div className="flex flex-col gap-2 pl-[6px]">
        <Link
          className="w-[208px] h-[45px] flex items-center justify-center bg-[#F9F9F9] text-[#888888] border border-brand-gray rounded-[5px]"
          href={{
            pathname: '/creator/series/new',
            query: { webtoonId: data.webtoonId },
          }}
        >
          작품 수정
        </Link>
        <Link
          className="w-[208px] h-[45px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px]"
          href={{
            pathname: '/creator/episode/new',
            query: { webtoonId: data.webtoonId, no: data.episodes.length + 1 },
          }}
        >
          신규 회차 등록
        </Link>
      </div>
    </div>
  );
};

export default SeriesInfo;
