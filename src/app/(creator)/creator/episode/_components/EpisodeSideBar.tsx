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
    <div className="flex flex-col gap-2 w-[180px] border-r h-full items-center min-h-[1200px] px-3 py-[15px]">
      <DefaultImage
        src={webtoonInfo.thumbnail}
        alt=""
        width={150}
        height={255}
      />
      <span>{webtoonInfo.title}</span>

      <div className="flex flex-col w-full pt-[70px] text-[14px]">
        <Link
          href={{
            pathname: '/creator/episode',
            query: { webtoonId: webtoonInfo.id },
          }}
        >
          <button
            className={`w-full h-[50px] rounded-[5px] ${
              pathname === '/creator/episode' && 'bg-[#E4EBFF] text -brand-blue'
            }`}
          >
            <div className="flex items-center justify-center gap-[10px] w-full h-full">
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
            className={`w-full h-[50px] rounded-[5px] ${
              pathname === '/creator/series/new' &&
              'bg-[#E4EBFF] text-brand-blue'
            }`}
          >
            <div className="flex items-center justify-center gap-[10px] w-full h-full">
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
