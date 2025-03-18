'use client';

import SliderDropdown from '@/app/(default)/main/_component/SliderDropdown';
import { useRouter, useSearchParams } from 'next/navigation';

const SeriesCategorySelector: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'ALL';

  const categories = [
    {
      value: 'ALL',
      label: '전체',
    },
    {
      value: 'IN_SERIES',
      label: '연재중',
    },
    {
      value: 'FINISH',
      label: '완결',
    },
  ];

  return (
    <SliderDropdown
      options={categories}
      defaultOption={status}
      onClickOption={(value) =>
        router.push(
          value === 'ALL'
            ? `/creator/series`
            : `/creator/series?status=${value}`
        )
      }
    />
  );
};

export default SeriesCategorySelector;
