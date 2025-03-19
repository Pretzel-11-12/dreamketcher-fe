import DefaultImage from '@/app/_component/DefaultImage';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import Link from 'next/link';
import Image from 'next/image';

interface EpisodeItemProp {
  items: fetchWebtoonDetail.Model.EpisodeUnit;
  webtoonId?: number;
}

const EpisodeListItem: React.FC<EpisodeItemProp> = ({ items, webtoonId }) => {
  const {
    episodeId,
    title,
    thumbnail,
    publishedAt,
    viewCount,
    likeCount,
    averageStar,
  } = items;

  const time = new Date(publishedAt).getTime();
  const now = new Date().setHours(0, 0, 0, 0);
  const isNewEpisode = time >= now;

  const formatTime = new Date(publishedAt)
    .toISOString()
    .split('T')[0]
    .replace(/-/g, '.');

  return (
    <Link
      href={{
        pathname: '/webtoon/detail',
        query: { titleId: webtoonId, no: episodeId },
      }}
    >
      <div className="grid grid-cols-[auto_1fr] border-b gap-[12px] p-[20px] pl-0 hover:bg-[#F8F8F8]">
        {thumbnail ? (
          <DefaultImage alt={title} src={thumbnail} height={60} width={100} />
        ) : (
          <div className="bg-[#DEE5EA] h-[60px] w-[100px]"></div>
        )}

        <div className="flex flex-col font-normal gap-1 justify-center items-start">
          <div className="flex items-center gap-1 text-[16px] text-titleBlack">
            {isNewEpisode && (
              <div className="flex bg-[#4C68B4] text-white w-[18px] text-[8px] rounded-sm font-semibold h-[15px] items-center justify-center">
                UP
              </div>
            )}
            {episodeId}화 - {title}
          </div>
          <div className="flex gap-3 items-center text-[12px] text-inActive">
            <div className="flex gap-1 items-center w-[40px]">
              <Image
                src="/assets/icon/list-star.svg"
                alt="star"
                width={12}
                height={12}
              />
              <div>{(averageStar || 0).toFixed(2)}</div>
            </div>
            <div className="text-[#E0E0E0]">|</div>
            <div>{formatTime}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EpisodeListItem;
