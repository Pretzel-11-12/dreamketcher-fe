'use client';

import CategoryTab, { CategoryItemProps } from '@/app/_component/CategoryTab';
import { useRouter, useSearchParams } from 'next/navigation';

enum CountSeries {
  IN_SERIES = 'inSeriesCount',
  FINISH = 'finishCount',
  NEW = 'newCount',
  REST = 'restCount',
  PRE_SERIES = 'preSeriesCount',
}

interface CountSeriesCategory {
  finishCount: number;
  inSeriesCount: number;
  newCount: number;
  preSeriesCount: number;
  restCount: number;
}
const SeriesCategorySelector: React.FC<CountSeriesCategory> = (count) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status')!;

  const categories: CategoryItemProps[] = [
    {
      id: 'IN_SERIES',
      label: '연재중',
      subLabel: `(${count[CountSeries.IN_SERIES]})`,
    },
    {
      id: 'FINISH',
      label: '완결',
      subLabel: `(${count[CountSeries.FINISH]})`,
    },
    { id: 'NEW', label: '신작', subLabel: `(${count[CountSeries.NEW]})` },
    {
      id: 'REST',
      label: '휴재',
      subLabel: `(${count[CountSeries.REST]})`,
    },
    {
      id: 'PRE_SERIES',
      label: '연재전',
      subLabel: `(${count[CountSeries.PRE_SERIES]})`,
    },
  ];

  return (
    <CategoryTab
      items={categories}
      selectedId={status}
      handleCategoryClick={(value) => {
        router.push(`/creator/series?status=${value}`);
      }}
    />
  );
};

export default SeriesCategorySelector;
