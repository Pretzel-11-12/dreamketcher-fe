import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/app/_component/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FavoriteWebtoon } from '@/model/Webtoon';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

const FavoriteWebtoonItem: React.FC<FavoriteWebtoon> = ({
  webtoonId,
  title,
  thumbnail,
  authorNickname,
  updatedAt,
  episodeCount,
  genre,
}) => {
  const [showMenu, setShowMenu] = useState(false); // 메뉴 상태
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 참조
  const router = useRouter();
  function navigateToWebtoon() {
    router.push(`/webtoon/list?id=${webtoonId}`);
  }

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleDelete = async () => {
    await fetchWebtoonDetail.deleteFavoriteWebtoon({
      param: { id: String(webtoonId) },
    });

    alert(`작품 '${title}'이 관심웹툰에서 삭제되었습니다.`);
    window.location.reload();
  };

  // 다른 영역 클릭 시 메뉴 닫기
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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  return (
    <div className="flex items-center relative gap-4 pb-5 border-b border-b-line">
      <img
        src={thumbnail}
        alt={title}
        className="w-[100px] h-[150px] object-cover rounded cursor-pointer"
        onClick={navigateToWebtoon}
      />
      <div className="flex w-[126px] flex-col">
        <h3
          className="text-base font-semibold cursor-pointer"
          onClick={navigateToWebtoon}
        >
          {title}
        </h3>
        <p className="text-xs text-[#888888] mt-1">
          {authorNickname} {genre} &#183; {episodeCount}화
        </p>

        <div className="flex mt-1 mb-4">
          <Image
            src={'/assets/icon/clock.svg'}
            alt="Clock Icon"
            width={12}
            height={12}
            className="mr-[6px]"
          />
          <p className="text-xs text-[#888888]">
            {formatDate(updatedAt)} 업데이트
          </p>
        </div>
        <Link
          href={{
            pathname: '/webtoon/detail',
            query: { titleId: webtoonId, no: episodeCount },
          }}
        >
          <Button
            props={{
              size: 'M',
              variant: 'brand-yellow',
              containerStyles: 'w-[126px] h-[34px] text-xs',
            }}
          >
            <div className="flex items-center justify-center">
              {episodeCount}화 보러가기
            </div>
          </Button>
        </Link>
      </div>

      <div className="flex absolute top-14 right-1" ref={menuRef}>
        <Image
          src={'/assets/icon/notification.svg'}
          alt="notification Icon"
          width={34}
          height={34}
          className="mr-[10px]"
        />

        <div className="relative">
          <Image
            src={'/assets/icon/meatballsMenu.svg'}
            alt="meatballsMenu Icon"
            width={30}
            height={30}
            className="ml-auto px-1 py-1 rounded cursor-pointer hover:bg-[#F2F2F2]"
            onClick={toggleMenu}
          />

          {/* 삭제 버튼 메뉴 */}
          {showMenu && (
            <div
              className="absolute right-0 mt-1 bg-white border border-[#F2F2F2] rounded-lg shadow-sm"
              style={{ zIndex: 10 }}
            >
              <button
                className="block w-[120px] text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                onClick={handleDelete}
              >
                작품 삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteWebtoonItem;
