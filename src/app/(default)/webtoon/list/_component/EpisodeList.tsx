import _ from 'lodash';

import EpisodeListItem from './EpisodeListItem';
import { useEffect, useState } from 'react';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

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
      .orderBy((item) => item.episodeId, sortDirection)
      .value();

    setSortedListItems(sortedItems);
  }, [sortDirection, episodeItems]);

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
      <div className="min-h-20">
        {sortedListItems.map((item, index) => (
          <EpisodeListItem items={item} key={index} webtoonId={webtoonId} />
        ))}
      </div>
    </div>
  );
};
export default EpisodeList;
