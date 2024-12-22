'use client';

import { useSearchParams } from 'next/navigation';
import SeriesForm from './SeriesForm';
import EpisodeSideBar from '../../episode/_components/EpisodeSideBar';

export default function Temp() {
  const searchParams = useSearchParams();

  const seriesId = searchParams.get('seriesId');
  const isExist = !!seriesId;

  return (
    <div
      className={`grid grid-cols-[${
        isExist ? 'auto_1fr' : '1fr'
      }] mt-[80px] w-full h-full`}
    >
      {isExist && <EpisodeSideBar />}
      <div className="flex flex-col w-full px-8">
        <div className="text-xl font-semibold py-4 border-b">
          {isExist ? '별종의 세계 - 작품 수정' : '새 작품 등록'}
        </div>
        <div className="py-8">
          <SeriesForm />
        </div>
      </div>
    </div>
  );
}
