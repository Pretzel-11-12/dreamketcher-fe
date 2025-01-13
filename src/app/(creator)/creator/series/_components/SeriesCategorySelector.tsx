'use client';

import CategoryTab, { CategoryItemProps } from '@/app/_component/CategoryTab';
import { useRouter, useSearchParams } from 'next/navigation';

const categories: CategoryItemProps[] = [
  { id: 'IN_SERIES', label: '연재중' },
  { id: 'FINISH', label: '완결' },
  { id: 'NEW', label: '신작' },
];
export default function SeriesCategorySelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status')!;

  return (
    <CategoryTab
      items={categories}
      selectedId={status}
      handleCategoryClick={(value) => {
        router.push(`/creator/series?status=${value}`);
      }}
    />
  );
}
