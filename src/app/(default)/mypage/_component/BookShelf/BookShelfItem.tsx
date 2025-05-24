import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Folder } from '@/app/api/fetchFolder/model';

const BookShelfItem: React.FC<{ shelf: Folder }> = ({ shelf }) => {
  const { folderName, isPrivate, webtoons, folderId } = shelf;
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  function navigateToDetail() {
    router.push(`/mypage/storage/bookShelf/${folderId}`);
  }

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
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

  // const mutation = useMutation(deleteBookShelfFolder, {
  //   onSuccess: () => {
  //     console.log('책장 폴더 삭제 성공');
  //   },
  //   onError: (error) => {
  //     console.error('책장 폴더 삭제 실패:', error);
  //   },
  // });
  //
  // const handleDeleteFolder = () => {
  //   mutation.mutate(folderId);
  // };

  return (
    <div
      className="flex flex-col items-start relative w-[210px] h-[220px] mb-4 rounded-lg">
      <div
        className="flex w-[210px] h-[165px] rounded cursor-pointer"
        onClick={navigateToDetail}>
        <div className="w-[110px] h-[165px] relative overflow-hidden">
          {webtoons?.length > 0 && webtoons[0]?.thumbnail ? (
            <img
              src={webtoons[0].thumbnail}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full bg-[#F9F9F9]" />
          )}
        </div>
        <div className="flex flex-col w-[100px] h-[165px] gap-[2px] pl-[2px]">
          {webtoons?.length > 1 && webtoons[1]?.thumbnail ? (
            <div className="w-[100px] h-[81px] overflow-hidden">
              <img
                src={webtoons[1].thumbnail}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-[#F9F9F9]" />
            )}
          {webtoons?.length > 2 && webtoons[2]?.thumbnail ? (
            <div className="w-[100px] h-[81px] overflow-hidden">
              <img
                src={webtoons[2].thumbnail}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-[#F9F9F9]" />
          )}
        </div>
      </div>
      <div className="flex mt-2.5">
        <div className="flex flex-col w-[185px] h-[45px]">
          <div className="flex">
            <p className="text-lg font-medium text-titleBlack">{folderName}</p>
            {isPrivate && (
              <Image
                src={'/assets/icon/lock.svg'}
                alt="lock Icon"
                width={18}
                height={18}
                className="ml-[1px]"
              />
            )}
          </div>
          <p className="text-[#888888]">총 {webtoons?.length}권</p>
        </div>
      </div>
      <div
        className="absolute right-0 bottom-[15px]"
        ref={menuRef}>
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
            className="absolute right-0 top-5 mt-1 bg-white border border-[#F2F2F2] rounded-lg shadow-sm z-10"
            style={{ zIndex: 10 }}>
            <button
              className="block w-[120px] h-9 text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
              // onClick={handleDeleteFolder}
            >
              책장 공개
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookShelfItem;
