import EpisodeListItem from './EpisodeListItem';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

const listItems = [
  {
    id: 1,
    title: `I'm like some kind of supernova, Watch out`,
    timestamp: 1730918078224,
    star: 4.5,
    like: 10,
    views: 40,
  },
  {
    id: 2,
    title: `I'm like some kind of supernova, Watch out`,
    timestamp: 1731918078224,
    star: 4.5,
    like: 10,
    views: 40,
  },
  {
    id: 3,
    title: `I'm like some kind of supernova, Watch out`,
    timestamp: 1733919078224,
    star: 4.5,
    like: 10,
    views: 40,
  },
  {
    id: 4,
    title: `I'm like some kind of supernova, Watch out`,
    timestamp: 1733920078224,
    star: 4.5,
    like: 10,
    views: 40,
  },
  {
    id: 5,
    title: `I'm like some kind of supernova, Watch out`,
    timestamp: 1733920178224,
    star: 4.5,
    like: 10,
    views: 40,
  },
  {
    id: 6,
    title: `I'm like some kind of supernova, Watch out`,
    timestamp: 1736929144003,
    star: 4.5,
    like: 10,
    views: 40,
  },
];
type episodeItemsProps = {
  webtoonId?: number;
  episodeCount: number;
  episodeItems: fetchWebtoonDetail.Model.EpisodeUnit[];
};

const EpisodeList: React.FC<episodeItemsProps> = ({
  webtoonId,
  episodeCount,
  episodeItems,
}) => {
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');
  const [sortedListItems, setSortedListItems] = useState<
    fetchWebtoonDetail.Model.EpisodeUnit[]
  >([]);

  useEffect(() => {
    const sortedItems = _(episodeItems)
      .orderBy((item) => item.publishedAt, sortDirection)
      .value();

    setSortedListItems(sortedItems);
  }, [sortDirection]);

  return (
    <div>
      <div className="flex justify-between px-5">
        <div>총 {episodeCount}화</div>

        <div className="flex gap-2">
          <div
            className={`text-sm font-${
              sortDirection === 'desc' && 'semibold'
            } cursor-pointer`}
            onClick={() => setSortDirection('desc')}
          >
            최신화부터
          </div>

          <div
            className={`text-sm font-${
              sortDirection === 'asc' && 'semibold'
            } cursor-pointer`}
            onClick={() => setSortDirection('asc')}
          >
            1화부터
          </div>
        </div>
      </div>
      {sortedListItems.map((item, index) => (
        <EpisodeListItem
          key={index}
          thumbnail={item.thumbnail}
          episodeId={item.episodeId}
          title={item.title}
          webtoonId={webtoonId}
          publishedAt={item.publishedAt}
          viewCount={item.viewCount}
          likeCount={item.likeCount}
          averageStar={item.averageStar}
        />
      ))}
    </div>
  );
};
export default EpisodeList;
