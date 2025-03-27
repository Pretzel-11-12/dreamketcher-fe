import { fetchComment } from '@/app/api/fetchComment';
import Image from 'next/image';
import 'moment/locale/ko';
import moment from 'moment-timezone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

type CommentInfoType = {
  info: fetchComment.Model.ResCommentUnit;
  webtoonId: string;
  episodeId: string;
  handleClick: () => void;
};
const CommentItem: React.FC<CommentInfoType> = ({
  info,
  webtoonId,
  episodeId,
  handleClick,
}) => {
  moment.locale('ko');

  const timeAgo = moment.utc(info.createdAt).tz('Asia/Seoul').fromNow();

  const [showMenu, setShowMenu] = useState(false); // 메뉴 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [isDisliked, setIsDisliked] = useState(false); // 싫어요 상태
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

  // 댓글 추천
  const { mutate: recommendCommentMutate } = useMutation({
    mutationFn: (variables: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
    }) =>
      fetchComment.recommendComment(
        variables.webtoonId,
        variables.episodeId,
        variables.commentId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [webtoonId, episodeId, 'comments'],
      });
    },
    onError: (e) => console.log(e),
  });

  // 댓글 추천 취소
  const { mutate: deleteRecommendCommentMutate } = useMutation({
    mutationFn: (variables: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
    }) =>
      fetchComment.deleteRecommendComment(
        variables.webtoonId,
        variables.episodeId,
        variables.commentId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [webtoonId, episodeId, 'comments'],
      });
    },
    onError: (e) => console.log(e),
  });

  // 댓글 비추천
  const { mutate: notRecommendCommentMutate } = useMutation({
    mutationFn: (variables: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
    }) =>
      fetchComment.notRecommendComment(
        variables.webtoonId,
        variables.episodeId,
        variables.commentId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [webtoonId, episodeId, 'comments'],
      });
    },
    onError: (e) => console.log(e),
  });

  // 댓글 삭제
  const { mutate: deleteCommentMutate, isError } = useMutation({
    mutationFn: fetchComment.deleteComment,
    onSuccess: () => {
      alert('댓글이 삭제되었습니다.');
      // 성공 시 기존 댓글 리스트를 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: [webtoonId, episodeId, 'comments'],
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

  // 좋아요/싫어요 상태 관리
  const toggleLike = () => {
    if (isLiked) {
      deleteRecommendCommentMutate({
        webtoonId,
        episodeId,
        commentId: String(info.id),
      });
      setIsLiked(false);
    } else {
      recommendCommentMutate({
        webtoonId,
        episodeId,
        commentId: String(info.id),
      });
      setIsLiked(true);
    }
  };

  const toggleDislike = () => {
    if (isDisliked) {
      notRecommendCommentMutate({
        webtoonId,
        episodeId,
        commentId: String(info.id),
      });
      setIsDisliked(false);
    } else {
      notRecommendCommentMutate({
        webtoonId,
        episodeId,
        commentId: String(info.id),
      });
      setIsDisliked(true);
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr] py-5 gap-[14px] border-b border-gray-500/10">
      <Image
        src={info.profileImage}
        alt="profile"
        width={36}
        height={36}
        className="w-9 h-9 rounded-full border border-[#F2F2F2] object-cover shadow-[inset_0_0_0_1px_#F2F2F2]"
      />
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div className="text-sm/[17px] text-[#282828] font-medium">
            {info.nickname}
          </div>
          <div className="text-xs text-[#888888]">{timeAgo}</div>
        </div>

        <div className="text-[13px]/[16px] text-[#3F3F3F]">{info.content}</div>
        <div className="h-5 mt-1 flex gap-4 text-[#888888]">
          <div
            className="text-xs flex items-center gap-1 cursor-pointer"
            onClick={handleClick}
          >
            <Image
              src="/assets/icon/inactiveMessage.svg"
              alt="reply"
              width={13}
              height={13}
            />
            {info.childCommentCount > 0 ? info.childCommentCount : '답글'}
          </div>

          <div
            className="text-xs flex items-center gap-1 cursor-pointer"
            onClick={toggleLike}
          >
            <Image
              src={
                isLiked
                  ? '/assets/icon/activeLike.svg'
                  : '/assets/icon/inactiveLike.svg'
              }
              alt="like"
              width={13}
              height={13}
            />
            <span className={isLiked ? 'text-brand-yellow' : ''}>
              {info.recommendationCount > 0
                ? info.recommendationCount
                : '좋아요'}
            </span>
          </div>
          <div
            className="text-xs flex items-center gap-1 cursor-pointer"
            onClick={toggleDislike}
          >
            <Image
              src={
                isDisliked
                  ? '/assets/icon/activeDislike.svg'
                  : '/assets/icon/inactiveDislike.svg'
              }
              alt="dislike"
              width={13}
              height={13}
            />
            <span className={isDisliked ? 'text-[#2E4072]' : ''}>
              {info.notRecommendationCount > 0
                ? info.notRecommendationCount
                : '싫어요'}
            </span>
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
                        commentId: String(info.id),
                      },
                    })
                  }
                >
                  댓글 삭제
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

export default CommentItem;
