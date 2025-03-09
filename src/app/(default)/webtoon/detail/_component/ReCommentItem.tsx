import 'moment/locale/ko';
import moment from 'moment-timezone';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchComment } from '@/app/api/fetchComment';
import { useEffect, useRef, useState } from 'react';

export interface CommentInfo {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  profileImage: string;
}

type ReCommentInfoType = {
  info: CommentInfo;
  isLast: boolean;
  webtoonId: string;
  episodeId: string;
  parentCommentId: string;
};
const ReCommentItem: React.FC<ReCommentInfoType> = ({
  info,
  isLast,
  webtoonId,
  episodeId,
  parentCommentId,
}) => {
  moment.locale('ko');
  const timeAgo = moment.utc(info.createdAt).tz('Asia/Seoul').fromNow();

  const [showMenu, setShowMenu] = useState(false); // 메뉴 상태
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 참조

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

  const queryClient = useQueryClient();

  // 대댓글 추천
  const { mutate: recommendReCommentMutate } = useMutation({
    mutationFn: (variables: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
      recommentId: string;
    }) =>
      fetchComment.recommendReComment(
        variables.webtoonId,
        variables.episodeId,
        variables.commentId,
        variables.recommentId
      ),
    onSuccess: () =>
      // 성공 시 기존 대댓글 리스트를 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: [Number(parentCommentId), 'recomments'],
      }),
    onError: (e) => console.log(e),
  });

  // 대댓글 비추천
  const { mutate: notRecommendReCommentMutate } = useMutation({
    mutationFn: (variables: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
      recommentId: string;
    }) =>
      fetchComment.notRecommendReComment(
        variables.webtoonId,
        variables.episodeId,
        variables.commentId,
        variables.recommentId
      ),
    onSuccess: () =>
      // 성공 시 기존 대댓글 리스트를 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: [Number(parentCommentId), 'recomments'],
      }),
    onError: (e) => console.log(e),
  });

  // 대댓글 삭제
  const { mutate: deleteCommentMutate, isError } = useMutation({
    mutationFn: fetchComment.deleteReComment,
    onSuccess: () => {
      alert('대댓글이 삭제되었습니다.');
      // 성공 시 기존 대댓글 리스트를 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: [Number(parentCommentId), 'recomments'],
      });
    },
    onError: (error: any) => {
      if (error.code === 'UNAUTHORIZED_MEMBER') {
        alert('작성자만 삭제할 수 있습니다.');
      } else {
        alert('대댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.error('대댓글 삭제 에러:', error);
      }
    },
  });

  return (
    <div
      className={`grid grid-cols-[auto_auto_1fr] py-5 gap-[14px] ${
        !isLast && 'border-b border-[#F2F2F2]'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M1 1V12C1 14.7614 3.23858 17 6 17H17"
          stroke="#E0E0E0"
          stroke-linecap="round"
        />
      </svg>
      <Image
        src={info.profileImage}
        alt="profile"
        width={36}
        height={36}
        className="w-9 h-9 ml-[6px] rounded-full object-cover shadow-[inset_0_0_0_1px_#F2F2F2]"
      />
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div className="text-[14px] text-titleBlack">{info.nickname}</div>
          <div className="text-[12px] text-gray-500">{timeAgo}</div>
        </div>

        <div className="text-[13px] mb-[7px] text-titleBlack">
          {info.content}
        </div>

        <div className="h-5 flex gap-4 text-[#888888]">
          <div
            className="text-xs flex items-center gap-1 cursor-pointer"
            onClick={() =>
              recommendReCommentMutate({
                webtoonId,
                episodeId,
                commentId: String(info.id),
                recommentId: String(parentCommentId),
              })
            }
          >
            <Image
              src="/assets/icon/inactiveLike.svg"
              alt="like"
              width={13}
              height={13}
            />
            좋아요
          </div>
          <div
            className="text-xs flex items-center gap-1 cursor-pointer"
            onClick={() =>
              notRecommendReCommentMutate({
                webtoonId,
                episodeId,
                commentId: String(info.id),
                recommentId: String(parentCommentId),
              })
            }
          >
            <Image
              src="/assets/icon/inactiveDislike.svg"
              alt="dislike"
              width={13}
              height={13}
            />
            싫어요
          </div>
          <div className="flex relative ml-auto" ref={menuRef}>
            <Image
              src={'/assets/icon/meatballsMenu.svg'}
              alt="meatballsMenu Icon"
              width={20}
              height={20}
              className="ml-auto p-[1px] rounded cursor-pointer hover:bg-[#F2F2F2]"
              onClick={toggleMenu}
            />

            {/* 삭제 버튼 메뉴 */}
            {showMenu && (
              <div className="absolute right-0 top-5 mt-1 bg-white border border-[#F2F2F2] rounded-lg shadow-sm z-10">
                <button
                  className="block w-[120px] h-9 text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() =>
                    deleteCommentMutate({
                      param: {
                        webtoonId,
                        episodeId,
                        commentId: parentCommentId,
                        recommentId: String(info.id),
                      },
                    })
                  }
                >
                  대댓글 삭제
                </button>
                <button className="block w-[120px] h-9 text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  신고
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReCommentItem;
