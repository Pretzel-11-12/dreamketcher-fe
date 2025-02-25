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

  const { mutate: deleteCommentMutate, isError } = useMutation({
    mutationFn: fetchComment.deleteComment,
    onSuccess: () =>
      // 성공 시 기존 댓글 리스트를 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: [webtoonId, episodeId, 'comments'],
      }),
    onError: (e) => console.log(e),
  });

  return (
    <div className="grid grid-cols-[auto_1fr] py-5 gap-[14px] border-b border-gray-500/10">
      <Image
        src={info.profileImage}
        alt="profile"
        width={36}
        height={36}
        className="w-9 h-9 rounded-full object-cover shadow-[inset_0_0_0_1px_#F2F2F2]"
      />
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div className="text-sm/[17px]">{info.nickname}</div>
          <div className="text-xs text-[#888888]">{timeAgo}</div>
        </div>

        <div className="text-[13px]">{info.content}</div>
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

          <div className="text-xs flex items-center gap-1 cursor-pointer">
            <Image
              src="/assets/icon/inactiveLike.svg"
              alt="like"
              width={13}
              height={13}
            />
            좋아요
          </div>
          <div className="text-xs flex items-center gap-1 cursor-pointer">
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
