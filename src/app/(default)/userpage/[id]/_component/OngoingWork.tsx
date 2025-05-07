import { UserWebtoon } from '@/model/Webtoon';
import OngoingWorkItem from '@/app/(default)/userpage/[id]/_component/OngoingWorkItem';

const OngoingWork = ({ works }: { works: UserWebtoon[] }) => {
  if (works.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-center text-[#888888] text-lg mt-[100px] font-medium">
          아직 작품이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(570px,1fr))] mt-[10px]">
      {works.map((work) => (
        <OngoingWorkItem key={work.id} {...work} />
      ))}
    </div>

  );
};

export default OngoingWork;
