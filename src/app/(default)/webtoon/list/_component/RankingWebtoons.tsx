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

  // 실제와 비슷한 목 데이터 (10개)
  const mockWebtoons: IWebtoon[] = [
    {
      id: -1,
      title: '나 혼자만 레벨업',
      thumbnail: '/assets/images/mock-thumbnail-1.png',
      genre: 'FANTASY',
      authorNickname: '추공',
      lastEpisode: 179,
      averageStar: 4.8,
      numOfStars: 12450,
      story: '평범한 헌터에서 최강의 헌터가 되어가는 성장 판타지',
      tags: [],
    },
    {
      id: -2,
      title: '전지적 독자 시점',
      thumbnail: '/assets/images/mock-thumbnail-2.png',
      genre: 'FANTASY',
      authorNickname: '싱숑',
      lastEpisode: 168,
      averageStar: 4.9,
      numOfStars: 15230,
      story: '소설 속 주인공이 되어 세계의 멸망을 막는 이야기',
      tags: [],
    },
    {
      id: -3,
      title: '외모지상주의',
      thumbnail: '/assets/images/mock-thumbnail-3.png',
      genre: 'ACTION',
      authorNickname: '박태준',
      lastEpisode: 423,
      averageStar: 4.6,
      numOfStars: 18920,
      story: '못생긴 소년이 잘생긴 몸을 얻게 되면서 벌어지는 이야기',
      tags: [],
    },
    {
      id: -4,
      title: '여신강림',
      thumbnail: '/assets/images/mock-thumbnail-4.png',
      genre: 'ROMANCE',
      authorNickname: '야옹이',
      lastEpisode: 178,
      averageStar: 4.7,
      numOfStars: 22340,
      story: '평범한 소녀가 메이크업으로 여신이 되는 로맨스',
      tags: [],
    },
    {
      id: -5,
      title: '화산귀환',
      thumbnail: '/assets/images/mock-thumbnail-5.png',
      genre: 'ACTION',
      authorNickname: '비가',
      lastEpisode: 134,
      averageStar: 4.8,
      numOfStars: 9870,
      story: '화산파의 13대 제자가 100년 후 과거로 돌아가는 무협 액션',
      tags: [],
    },
    {
      id: -6,
      title: '취사병',
      thumbnail: '/assets/images/mock-thumbnail-6.png',
      genre: 'COMEDY',
      authorNickname: '양경일',
      lastEpisode: 156,
      averageStar: 4.5,
      numOfStars: 7650,
      story: '군대에서 요리로 승부하는 유쾌한 코미디',
      tags: [],
    },
    {
      id: -7,
      title: '싸움독학',
      thumbnail: '/assets/images/mock-thumbnail-7.png',
      genre: 'ACTION',
      authorNickname: '박용제',
      lastEpisode: 187,
      averageStar: 4.6,
      numOfStars: 11230,
      story: '유튜브로 격투기를 배워 최강이 되는 액션 스토리',
      tags: [],
    },
    {
      id: -8,
      title: '하루 3컷',
      thumbnail: '/assets/images/mock-thumbnail-8.png',
      genre: 'COMEDY',
      authorNickname: '치킨',
      lastEpisode: 298,
      averageStar: 4.4,
      numOfStars: 8900,
      story: '일상 속 소소한 재미를 담은 3컷 만화',
      tags: [],
    },
    {
      id: -9,
      title: '윈드브레이커',
      thumbnail: '/assets/images/mock-thumbnail-9.png',
      genre: 'ACTION',
      authorNickname: '조용석',
      lastEpisode: 456,
      averageStar: 4.7,
      numOfStars: 14560,
      story: '자전거 크루들의 열정적인 청춘 액션',
      tags: [],
    },
    {
      id: -10,
      title: '백수세끼',
      thumbnail: '/assets/images/mock-thumbnail-10.png',
      genre: 'COMEDY',
      authorNickname: '김태형',
      lastEpisode: 89,
      averageStar: 4.3,
      numOfStars: 5420,
      story: '백수의 일상을 유쾌하게 그린 생활 코미디',
      tags: [],
    },
  ];

  // 서버 데이터가 10개 이하일 때 목 데이터로 채우기
  const fillWithMockData = (
    originalData: IWebtoon[] | undefined
  ): IWebtoon[] => {
    if (!originalData) return [];

    const result = [...originalData];

    // 부족한 만큼 목 데이터로 채우기
    const needed = 10 - result.length;
    if (needed > 0) {
      result.push(...mockWebtoons.slice(0, needed));
    }

    return result;
  };

  const ranking = fillWithMockData(data);

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
              className="grid grid-cols-[15px_1fr] gap-[12px] cursor-pointer text-contentBlack font-medium"
              key={item.title}
            >
              <p className="text-[14px] text-[#EF4C4C] text-center">
                {index + 1}
              </p>
              <p className="text-[14px] hover:text-inActive">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RankingWebtoons;
