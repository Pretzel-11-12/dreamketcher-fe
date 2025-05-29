'use client';
import DefaultImage from '@/app/_component/DefaultImage';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import Link from 'next/link';

type SeriesInfoProps = fetchWebtoonDetail.Model.WebtoonDetail & {
  episodeCount: number;
};

const SeriesInfo: React.FC<SeriesInfoProps> = ({
  episodeCount,
  ...webtoon
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-[14px]">
      <DefaultImage
        src={webtoon.webtoonThumbnail}
        alt={webtoon.webtoonTitle}
        width={165}
        height={247}
      />

      <div className="flex flex-col">
        <span className="text-titleBlack text-[20px] font-[500]">
          {webtoon.webtoonTitle}
        </span>

        <span className="text-contentBlack text-[14px] font-normal">
          {webtoon.webtoonStory}
        </span>
      </div>

      <div className="flex flex-col gap-2 pl-[6px]">
        <Link
          className="w-[208px] h-[45px] flex items-center justify-center bg-bgGray text-[#888888] border border-brand-gray rounded-[5px]"
          href={{
            pathname: '/creator/series/new',
            query: { webtoonId: webtoon.webtoonId },
          }}
        >
          작품 수정
        </Link>
        <Link
          className="w-[208px] h-[45px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px]"
          href={{
            pathname: '/creator/episode/new',
            query: { webtoonId: webtoon.webtoonId, no: episodeCount + 1 },
          }}
        >
          신규 회차 등록
        </Link>
      </div>
    </div>
  );
};

export default SeriesInfo;
