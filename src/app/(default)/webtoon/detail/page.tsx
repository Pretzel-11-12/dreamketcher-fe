import WriterInfoItem, { UserInfo } from './_component/WriterInfoItem';
import CommentListItem, { CommentInfo } from './_component/CommentListItem';
import EpisodeButtonGroup from './_component/EpisodeButtonGroup';
import Button from '@/app/_component/Button';
import Textarea from '@/app/_component/Textarea';
import Dropdown from '@/app/_component/Dropdown';

const commnets = [
  {
    id: 1,
    name: 'comment 1',
    description:
      '문제를 수 브라운관이, 다양하는, 그 관한다, 하는 등 이룰 하에요. 친하던 다시 꺼내는 숙명의 것 촉촉이 하면서 어떠할 등, 및 일컬어지느냐. 개성 이야기에 시설이 하거나 씰룩거리려 그녀를 이래 기성세대를 늘어날까. 모습에 대가부장적 축하에 농사철이 행복해함, 하나를 2025년 선장을 하나다 복합하다. 아니는 능행을 분수의 범으로 이용자의 깨닫아 목표를 돌리다.',
    like: 1,
    timestamp: 1730766637666,
  },
  {
    id: 2,
    name: 'comment 2',
    description:
      '문제를 수 브라운관이, 다양하는, 그 관한다, 하는 등 이룰 하에요. 친하던 다시 꺼내는 숙명의 것 촉촉이 하면서 어떠할 등, 및 일컬어지느냐. 개성 이야기에 시설이 하거나 씰룩거리려 그녀를 이래 기성세대를 늘어날까. 모습에 대가부장적 축하에 농사철이 행복해함, 하나를 2025년 선장을 하나다 복합하다. 아니는 능행을 분수의 범으로 이용자의 깨닫아 목표를 돌리다.',
    like: 1,
    timestamp: 1730766637666,
  },
  {
    id: 3,
    name: 'comment 3',
    description:
      '문제를 수 브라운관이, 다양하는, 그 관한다, 하는 등 이룰 하에요. 친하던 다시 꺼내는 숙명의 것 촉촉이 하면서 어떠할 등, 및 일컬어지느냐. 개성 이야기에 시설이 하거나 씰룩거리려 그녀를 이래 기성세대를 늘어날까. 모습에 대가부장적 축하에 농사철이 행복해함, 하나를 2025년 선장을 하나다 복합하다. 아니는 능행을 분수의 범으로 이용자의 깨닫아 목표를 돌리다.',
    like: 1,
    timestamp: 1730766637666,
  },
];
const episodeData = {
  title: '',
  images: [],
  writerInfo: {
    name: '바크베',
    description: '안녕하새우',
  },
  detail: { like: 38, interest: 1147, star: 4.85 },
};

const dropdownOptions = [
  { label: '좋아요순', value: 'like' },
  { label: '최신순', value: 'recent' },
];

export default async function Detail({
  params,
  searchParams,
}: {
  params: Promise<{ params: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { titleId, no } = await searchParams;

  return (
    <div className="flex flex-col bg-[#FAFAFA] gap-5 w-full items-center">
      <div className="w-full flex items-center justify-center bg-white pb-10 shadow-[0px_4px_10px_rgba(0,0,0,0.04)]">
        <div className="w-[800px] flex flex-col gap-16 items-center justify-center text-md">
          <div className="bg-[#d9d9d985] h-[2000px] w-full"></div>
          <EpisodeButtonGroup />
        </div>
      </div>

      <div className="w-full flex items-center justify-center bg-white pt-14 shadow-[0_-4px_10px_rgba(0,0,0,0.04)]">
        <div className="w-[800px] flex flex-col gap-16 items-center justify-center text-md">
          <div className="h-full w-full flex flex-col pb-18 gap-1">
            <div className="p-5 border border-[#F2F2F2] rounded-md">
              <div className="text-[16px] font-medium pb-2">작가의 말</div>
              <WriterInfoItem
                name={episodeData.writerInfo?.name}
                description={episodeData.writerInfo?.description}
              />
            </div>

            <div className="text-md font-medium pt-10 pb-2">1,174개의 댓글</div>
            <div className="relative">
              <Textarea placeholder="댓글을 입력해주세요" height="130px" />
              <div className="absolute bottom-4 right-4">
                <Button
                  props={{
                    variant: 'brand-yellow',
                    size: 'S',
                  }}
                >
                  댓글 남기기
                </Button>
              </div>
            </div>

            <div className="pt-8">
              <Dropdown options={dropdownOptions} defaultOption="like" />
            </div>

            <div className="flex flex-col gap-2">
              {commnets.map((comment) => (
                <CommentListItem
                  id={comment.id}
                  name={comment.name}
                  description={comment.description}
                  like={comment.like}
                  timestamp={comment.timestamp}
                />
              ))}
            </div>
          </div>
          <Button
            props={{
              size: 'L',
              variant: 'brand-yellow',
              containerStyles: 'w-fit px-20',
            }}
          >
            다음화 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
