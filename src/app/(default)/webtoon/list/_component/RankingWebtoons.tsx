import { useQuery } from '@tanstack/react-query';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { getWebtoonRanking } from '@/app/(default)/main/_lib/getWebtoonRanking';
import _ from 'lodash';
import Link from 'next/link';
import { GenreEnum } from '@/app/util';

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
    <div className="flex flex-col gap-[15px]">
      <div className="flex gap-1 border-b pb-[14px] border-[#F2F2F2] justify-between">
        <p className="text-[16px] font-medium text-iconBlack">
          {GenreEnum[genre as keyof typeof GenreEnum]} 베스트
        </p>
        <p className="text-[12px] text-[#888888] self-end">더보기</p>
      </div>
      <div className="flex flex-col gap-[3px]">
        {ranking?.map((item, index) => (
          <Link
            href={{ pathname: `/webtoon/list`, query: { id: item.id } }}
            key={index}
          >
            <div
              className="grid grid-cols-[10px_1fr] gap-2 hover:text-[#888888] cursor-pointer text-contentBlack"
              key={item.title}
            >
              <p className="text-[13px] text-brand-blue text-center font-normal">
                {index + 1}
              </p>
              <p className="text-[13px]">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RankingWebtoons;
