import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import EpisodeItem from './EpisodeItem';
import _ from 'lodash';
import Link from 'next/link';
import Button from '@/app/_component/Button';

const headers = [
  '번호',
  '썸네일',
  '제목',
  '게시일',
  '조회수',
  '평균평점',
  '좋아요',
  '옵션',
];
type EpisodeListProps = {
  items: fetchWebtoonDetail.Model.EpisodeUnit[];
  webtoonInfo: { title: string; id: string; thumbnail: string };
};

const EpisodeList: React.FC<EpisodeListProps> = ({ items, webtoonInfo }) => {
  return (
    <>
      <div className="grid grid-cols-[30px_140px_180px_repeat(4,1fr)_80px] items-center pl-10 pr-4 text-sm gap-5 border-b py-2 text-gray-500 border-gray-400/20 bg-brand-gray/60">
        {headers.map((item) => (
          <div key={item} className="flex justify-center w-full">
            {item}
          </div>
        ))}
      </div>
      {_.isEmpty(items) ? (
        <div className="flex flex-col items-center py-[140px]">
          <span className="text-md font-semibold">회차가 없습니다.</span>
          <span className="text-md pb-8 text-gray-500">회차를 등록하세요!</span>
          <Link
            href={{
              pathname: `/creator/episode/new`,
              query: { webtoonId: webtoonInfo.id, no: 1 },
            }}
          >
            <Button
              props={{
                size: 'M',
                variant: 'brand-yellow',
                containerStyles: 'px-20 py-[10px]',
              }}
            >
              새 회차 등록하기
            </Button>
          </Link>
        </div>
      ) : (
        items.map((item, index) => (
          <EpisodeItem
            key={index}
            item={item}
            webtoonInfo={webtoonInfo}
            index={items.length - index}
          />
        ))
      )}
    </>
  );
};

export default EpisodeList;
