import EpisodeListItem, { EpisodeListItemInfo } from './EpisodeListItem';
import _ from 'lodash';
import { useEffect, useState } from 'react';

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

export default function EpisodeList({}) {
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');
  const [sortedListItems, setSortedListItems] = useState<EpisodeListItemInfo[]>(
    []
  );

  useEffect(() => {
    const sortedItems = _(listItems)
      .orderBy((item) => item.timestamp, sortDirection)
      .value();

    setSortedListItems(sortedItems);
  }, [sortDirection]);

  return (
    <div>
      <div className="flex justify-between px-5">
        <div>총 {4}화</div>

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
          title={item.title}
          id={item.id}
          timestamp={item.timestamp}
          views={item.views}
          like={item.like}
          star={item.star}
        />
      ))}
    </div>
  );
}
