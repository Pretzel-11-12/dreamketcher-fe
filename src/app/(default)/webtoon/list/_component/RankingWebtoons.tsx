import { useQuery } from '@tanstack/react-query';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { getWebtoonRanking } from '@/app/(default)/main/_lib/getWebtoonRanking';
import _ from 'lodash';
import Link from 'next/link';

const RankingWebtoons: React.FC<{ genre?: string }> = ({
  genre = 'RECOMMEND',
}) => {
  const { data, isLoading, isError } = useQuery<IWebtoon[]>({
    queryKey: ['webtoons', 'ranking', genre],
    queryFn: () => getWebtoonRanking(genre),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const ranking = _(data).take(10).value();

  return (
    <div className="flex flex-col gap-[15px] font-medium">
      <div className="border-b border-[#F2F2F2] pb-[14px]">
        <div className="flex items-center justify-between">
          <p className="text-[16px] text-iconBlack">{genre} 베스트</p>
          <p className="text-[12px] text-inActive font-normal">더보기</p>
        </div>
      </div>
      <div className="flex flex-col gap-[3px]">
        {ranking?.map((item, index) => (
          <Link
            href={{ pathname: `/webtoon/list`, query: { id: item.id } }}
            key={index}
          >
            <div
              className="grid grid-cols-[15px_1fr] gap-[12px] cursor-pointer text-contentBlack"
              key={item.title}
            >
              <p className="text-[13px] text-[#EF4C4C] text-center">
                {index + 1}
              </p>
              <p className="text-[13px] hover:text-inActive">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RankingWebtoons;
