import _ from 'lodash';
import SeriesItem from './SeriesItem';
import Button from '@/app/_component/Button';
import Link from 'next/link';

const items = [{}, {}, {}];
const headers = [
  '작품',
  '회차 수',
  '업데이트',
  '연재 시작일',
  '조회수',
  '총 댓글',
  '관심웹툰',
  '옵션',
];

const SeriesList: React.FC<{}> = () => {
  const isEmpty = _.isEmpty(items);
  return (
    <>
      <div className="grid grid-cols-[120px_repeat(6,1fr)_80px] items-center px-4 text-sm gap-5 border-y py-2 text-gray-500 border-gray-400/10 bg-brand-gray/40">
        {headers.map((item) => (
          <div className="flex justify-center w-full">{item}</div>
        ))}
      </div>

      {!isEmpty ? (
        items.map((item) => <SeriesItem />)
      ) : (
        <div className="flex flex-col items-center py-[140px]">
          <span className="text-md font-semibold">아직 작품이 없습니다.</span>
          <span className="text-md pb-8 text-gray-500">
            새로운 작품을 시작해보세요!
          </span>
          <Link href={'/creator/series/new'}>
            <Button
              props={{
                size: 'M',
                variant: 'brand-yellow',
                containerStyles: 'px-20 py-[10px]',
              }}
            >
              새 작품 등록하기
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default SeriesList;
