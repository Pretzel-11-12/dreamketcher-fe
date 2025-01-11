import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import EpisodeItem from './EpisodeItem';
import _ from 'lodash';

const headers = [
  '번호',
  '썸네일',
  '제목',
  '연령가',
  '게시일',
  '조회수',
  '평균평점',
  '좋아요',
  '옵션',
];
type EpisodeListProps = {
  items: fetchWebtoonDetail.Model.EpisodeUnit[];
  webtoonInfo: { title: string; id: string };
};
const EpisodeList: React.FC<EpisodeListProps> = ({ items, webtoonInfo }) => {
  return (
    <>
      <div className="grid grid-cols-[repeat(8,1fr)_80px] items-center px-4 text-sm gap-5 border-b py-2 text-gray-500 border-gray-400/20 bg-brand-gray/60">
        {headers.map((item) => (
          <div key={item} className="flex justify-center w-full">
            {item}
          </div>
        ))}
      </div>
      {_.isEmpty(items)
        ? '빔'
        : items.map((item, index) => (
            <EpisodeItem key={index} item={item} webtoonInfo={webtoonInfo} />
          ))}
    </>
  );
};

export default EpisodeList;
