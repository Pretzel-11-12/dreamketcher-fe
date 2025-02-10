import 'moment/locale/ko';
import moment from 'moment';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchComment } from '@/app/api/fetchComment';

export interface CommentInfo {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
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
  const timeAgo = moment(info.createdAt).fromNow();

  const queryClient = useQueryClient();

  const { mutate: deleteCommentMutate, isError } = useMutation({
    mutationFn: fetchComment.deleteReComment,
    onSuccess: () =>
      // 성공 시 기존 대댓글 리스트를 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: [Number(parentCommentId), 'recomments'],
      }),
    onError: (e) => console.log(e),
  });

  return (
    <div
      className={`grid grid-cols-[auto_auto_1fr] py-5 gap-2 ${
        !isLast && 'border-b border-[#F2F2F2]'
      }`}
    >
      <div className="w-4 h-4 border-l border-b rounded-sm" />
      <span className="mdi mdi-account-circle text-gray-600/50 text-[40px] -mt-3"></span>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div className="text-[14px]">{info.nickname}</div>
          <div className="text-[12px] text-gray-500">{timeAgo}</div>
        </div>

        <div className="text-[13px]">{info.content}</div>

        <div className="flex gap-2 text-[#888888]">
          <div className="text-xs flex items-center gap-1 cursor-pointer">
            <Image
              src="/assets/icon/inactiveLike.svg"
              alt="like"
              width={13}
              height={13}
            />
            좋아요
          </div>
          <div className="flex gap-2 ml-auto">
            <Image
              src="/assets/icon/trash.svg"
              alt="trash"
              width={20}
              height={20}
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
              className="cursor-pointer"
            />
            <Image
              src="/assets/icon/report.svg"
              alt="report"
              width={26}
              height={26}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReCommentItem;
