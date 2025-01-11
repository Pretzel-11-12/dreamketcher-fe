import DefaultImage from '@/app/_component/DefaultImage';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

import Image from 'next/image';
import Link from 'next/link';

interface EpisodeItem extends fetchWebtoonDetail.Model.EpisodeUnit {
  webtoonId?: number;
}

export default function EpisodeListItem(episode: EpisodeItem) {
  const {
    webtoonId,
    episodeId,
    title,
    thumbnail,
    publishedAt,
    viewCount,
    likeCount,
    averageStar,
  } = episode;

  const time = new Date(publishedAt).getTime();
  const now = new Date().setHours(0, 0, 0, 0);
  const isNewEpisode = time >= now;

  const formatTime = new Date(publishedAt).toISOString().split('T')[0];

  return (
    <Link
      href={{
        pathname: '/webtoon/detail',
        query: { titleId: webtoonId, no: episodeId },
      }}
    >
      <div className="grid grid-cols-[auto_1fr] border-b gap-4 p-[20px] hover:bg-[#F8F8F8]">
        {thumbnail ? (
          <DefaultImage alt={title} src={thumbnail} height={60} width={100} />
        ) : (
          <div className="bg-[#DEE5EA] h-[60px] w-[100px]"></div>
        )}

        <div className="flex flex-col gap-1 justify-center">
          <div className="font-medium flex items-center gap-1 text-[16px]">
            {isNewEpisode && (
              <div className="flex bg-[#4C68B4] text-white w-[18px] text-[8px] rounded-sm font-semibold h-[15px] items-center justify-center">
                UP
              </div>
            )}
            {episodeId}화 - {title}
          </div>
          <div className="flex gap-3 items-center text-[12px] text-[#9F9F9F]">
            <div className="flex gap-1 items-center">
              <span className="mdi mdi-star"></span>
              <div>{averageStar || 0}</div>
            </div>
            <div className="flex gap-1 items-center">
              <span className="mdi mdi-thumb-up-outline"></span>
              <div>{likeCount || 0}</div>
            </div>
            <div>조회 {viewCount}</div>
            <div className="text-[#F2F2F2]">|</div>
            <div>{formatTime}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
