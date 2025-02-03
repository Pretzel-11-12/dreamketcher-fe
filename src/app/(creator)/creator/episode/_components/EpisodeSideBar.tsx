'use client';
import DefaultImage from '@/app/_component/DefaultImage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type EpisodeListProps = {
  webtoonInfo: { title: string; id: string; thumbnail: string };
};
const EpisodeSideBar: React.FC<EpisodeListProps> = ({ webtoonInfo }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 w-[220px] border-r h-full items-center min-h-[1200px] px-6">
      <DefaultImage
        src={webtoonInfo.thumbnail}
        alt=""
        width={200}
        height={250}
      />
      <span>{webtoonInfo.title}</span>

      <div className="flex flex-col w-full pt-[100px] text-md">
        <Link
          href={{
            pathname: '/creator/episode',
            query: { webtoonId: webtoonInfo.id },
          }}
        >
          <button
            className={`w-full h-[50px] ${
              pathname === '/creator/episode' && 'bg-[#E4EBFF] text-brand-blue'
            }`}
          >
            <div className="flex items-center justify-center gap-2 w-full h-full">
              <img
                src="/assets/images/task-square.svg"
                alt="Google Login Button"
              />
              회차 리스트
            </div>
          </button>
        </Link>

        <Link
          href={{
            pathname: '/creator/series/new',
            query: { webtoonId: webtoonInfo.id },
          }}
        >
          <button
            className={`w-full h-[50px] ${
              pathname === '/creator/series/new' &&
              'bg-[#E4EBFF] text-brand-blue'
            }`}
          >
            <div className="flex items-center justify-center gap-2 w-full h-full">
              <img
                src="/assets/images/info-circle.svg"
                alt="Google Login Button"
              />
              작품 정보
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EpisodeSideBar;
