import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/app/_component/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RecentWorkItemProps {
  id: number;
  image: string;
  title: string;
  writer: string;
  genre: string;
  episodes: number;
  rating: number;
  ratingCount: number;
}

const RecentWorkItem: React.FC<RecentWorkItemProps> = ({
  id,
  image,
  title,
  writer,
  genre,
  episodes,
  rating,
  ratingCount,
}) => {
  const [showMenu, setShowMenu] = useState(false); // 메뉴 표시 상태
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 영역 참조

  const router = useRouter();
  function navigateToWebtoon() {
    router.push('/webtoon/list');
  }

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleDelete = () => {
    alert(`작품 '${title}'이 삭제되었습니다.`);
    // TODO : 작품 삭제 로직 추가
  };

  // 다른 영역 클릭 시 메뉴를 닫는 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[870px] h-[190px] flex items-center relative gap-[17px] border-b border-b-line">
      <img
        src={image}
        alt={title}
        className="w-[100px] h-[150px] object-cover rounded cursor-pointer"
        onClick={navigateToWebtoon}
      />
      <div className="flex flex-col w-[126px]" style={{ paddingTop: '6.5px' }}>
        <h3
          className="text-base/[18px] font-semibold cursor-pointer"
          onClick={navigateToWebtoon}
        >
          {title}
        </h3>
        <p className="text-xs text-[#888888] mt-[7px]">
          {writer} &#183; {genre} &#183; {episodes}화
        </p>
        <div className="flex items-center mt-[7px] mb-[18px]">
          <Image
            src="/assets/images/star-1.png"
            alt="Star PNG"
            width={13}
            height={13}
          />
          <p className="text-brand-yellow text-xs ml-[3px] mt-[1px]">
            {rating}
          </p>
          <p className="text-[#C9C9C9] text-xs ml-[3px] mt-[1px]">
            ({ratingCount})
          </p>
        </div>
        <Link
          href={{
            pathname: '/webtoon/detail',
            query: { titleId: '12345', no: id },
          }}
        >
          <Button
            props={{
              size: 'M',
              variant: 'brand-yellow',
              handleClick: navigateToWebtoon,
              containerStyles:
                'w-[126px] h-[34px] text-xs relative before:absolute before:inset-0 before:rounded-[inherit] before:border-[1px] before:border-[#FA973B]',
            }}
          >
            <div className="flex items-center justify-center relative flex-shrink-0">
              {episodes}화 이어서 보기
            </div>
          </Button>
        </Link>
      </div>

      <div className="ml-auto relative" ref={menuRef}>
        <Image
          src={'/assets/icon/meatballsMenu.svg'}
          alt="meatballsMenu Icon"
          width={30}
          height={30}
          className="cursor-pointer px-1 py-1 rounded hover:bg-[#F2F2F2]"
          onClick={toggleMenu}
        />

        {/* 삭제 버튼 */}
        {showMenu && (
          <div
            className="absolute right-0 mt-1 bg-white border border-[#F2F2F2] rounded-lg shadow-sm"
            style={{ zIndex: 10 }}
          >
            <button
              className="block w-[120px] text-left px-3 py-2 text-[13px] text-gray-800 hover:bg-gray-100"
              onClick={handleDelete}
            >
              작품 삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentWorkItem;
