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
    <div className="flex flex-col gap-4 p-3">
      <div className="flex flex-col gap-1 border-b pb-3 border-[#F2F2F2]">
        <p className="text-[16px]">{genre} 베스트</p>
      </div>

      <div className="flex flex-col gap-[3px]">
        {ranking?.map((item, index) => (
          <Link href={`/webtoon/list?id=2`}>
            <div
              className="grid grid-cols-[10px_1fr] gap-2 hover:text-[#888888] cursor-pointer text-[#3F3F3F]"
              key={item.title}
            >
              <p className="text-[12px] text-right font-normal">{index + 1}</p>
              <p className="text-[12px]">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RankingWebtoons;
