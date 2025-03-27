import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import useAuthStore from '@/app/store/authStore';
import moment from 'moment-timezone';
import { _Model } from '@/app/api/fetchComment/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchComment } from '@/app/api/fetchComment';
import { useRouter } from 'next/navigation';
import ResMyCommentsUnit = _Model.ResMyCommentsUnit;

const CommentItem: React.FC<ResMyCommentsUnit> = ({
  id,
  webtoonId,
  episodeId,
  no,
  content,
  title,
  episodeTitle,
  episodeThumbnail,
  createdAt,
  recommendationCount,
  notRecommendationCount,
  childCommentCount,
}) => {

  const { nickname, imageUrl } = useAuthStore();
  moment.locale('ko');

  const timeAgo = moment.utc(createdAt).tz('Asia/Seoul').fromNow();

  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false); // 메뉴 상태
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 참조

  const queryClient = useQueryClient();

  function navigateToEpisode() {
    router.push(`/webtoon/detail?titleId=${webtoonId}&no=${episodeId}`);
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

  // 댓글 삭제
  const { mutate: deleteCommentMutate, isError } = useMutation({
    mutationFn: fetchComment.deleteComment,
    onSuccess: () => {
      alert('댓글이 삭제되었습니다.');
      // 성공 시 기존 댓글 리스트를 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: ['myComments'],
      });
    },
    onError: (error: any) => {
      if (error.code === 'UNAUTHORIZED_MEMBER') {
        alert('작성자만 삭제할 수 있습니다.');
      } else {
        alert('댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.error('댓글 삭제 에러:', error);
      }
    },
  });

  return (
    <div className="border-b py-5">
      <div className="flex items-start gap-[14px]">
        <Image
          src={imageUrl || '/assets/images/profile-default.png'}
          alt="프로필 이미지"
          width={36}
          height={36}
          className="w-[36px] h-[36px] rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="text-sm/[17px] text-titleBlack">{nickname}</span>
            <span className="text-xs text-[#888888]">{timeAgo}</span>
          </div>
          <p className="text-[13px] text-[#3F3F3F] mt-2">{content}</p>
          <div className="flex mt-[22px]">
            <Image
              src={episodeThumbnail}
              alt="프로필 이미지"
              width={42}
              height={42}
              className="w-[70px] h-[42px] rounded-md cursor-pointer"
              onClick={navigateToEpisode}
            />
            <span
              className="h-5 text-[13px]/[16px] text-[#888888] mt-1 ml-2 cursor-pointer"
              onClick={navigateToEpisode}>[{title}] - {no}화 {episodeTitle}
            </span>
            <Image
              src="/assets/icon/arrow-right-gray.svg"
              alt="rightArrow"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer"
              onClick={navigateToEpisode}
            />
          </div>
          <div className="h-5 flex items-center text-xs text-[#888888] gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Image
                src={'/assets/icon/inactiveMessage.svg'}
                alt="Message Icon"
                width={11}
                height={11}
              />
              <span className="mt-[2px]">{childCommentCount > 0 ? childCommentCount : '답글'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={'/assets/icon/inactiveLike.svg'}
                alt="Like Icon"
                width={11}
                height={11}
              />
              <span className="mt-[2px]">{recommendationCount > 0 ? recommendationCount : '좋아요'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={'/assets/icon/inactiveDislike.svg'}
                alt="Dislike Icon"
                width={11}
                height={11}
              />
              <span className="mt-[2px]">{notRecommendationCount > 0 ? notRecommendationCount : '싫어요'}</span>
            </div>
            <div className="flex relative ml-auto">
              <Image
                src={'/assets/icon/meatballsMenu.svg'}
                alt="meatballsMenu Icon"
                width={25}
                height={25}
                className="ml-auto px-1 py-1 rounded cursor-pointer hover:bg-[#F2F2F2]"
                onClick={toggleMenu}
              />

              {/* 삭제 버튼 메뉴 */}
              {showMenu && (
                <div className="absolute right-0 top-5 mt-1 bg-white border border-[#F2F2F2] rounded-lg shadow-sm z-10"
                     ref={menuRef}>
                  <button
                    className="block w-[120px] h-9 text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() =>
                      deleteCommentMutate({
                        param: {
                          webtoonId,
                          episodeId,
                          commentId: String(id),
                        },
                      })
                    }
                  >
                    댓글 삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
