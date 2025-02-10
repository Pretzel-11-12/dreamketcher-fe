import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchComment } from '@/app/api/fetchComment';
import Image from 'next/image';
import CommentItem from './CommentItem';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Button from '@/app/_component/Button';
import Textarea from '@/app/_component/Textarea';
import ReCommentItem from './ReCommentItem';

export interface CommentsInfo {
  item: fetchComment.Model.ResCommentUnit;
}
const CommentItemGroup: React.FC<CommentsInfo> = ({ item }) => {
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('titleId')!;
  const episodeId = searchParams.get('no')!;

  const [enableRecomments, setEnableRecomments] = useState(false);
  const [newReComment, setNewReComment] = useState('');

  const { data: recomments } = useQuery({
    queryKey: [item.id, 'recomments'],
    queryFn: () =>
      fetchComment.getReComments({
        param: { webtoonId, episodeId, commentId: item.id },
        query: { size: 20, page: 0, order: 'DESC' },
      }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: enableRecomments,
  });

  const queryClient = useQueryClient();
  const mutationWebtoon = useMutation({
    mutationFn: (arg: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
      content: string;
    }) =>
      fetchComment.postReComment({
        param: {
          webtoonId: arg.webtoonId,
          episodeId: arg.episodeId,
          commentId: arg.commentId,
          content: arg.content,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [item.id, 'recomments'],
      });

      queryClient.invalidateQueries({
        queryKey: [webtoonId, episodeId, 'comments'],
      });
    },
    onError: (e) => console.log(e),
  });

  return (
    <div>
      <CommentItem
        info={item}
        webtoonId={webtoonId}
        episodeId={episodeId}
        handleClick={() => setEnableRecomments(!enableRecomments)}
      />
      <div>
        {enableRecomments && (
          <div className="px-4 bg-[#F9F9F9] pb-4">
            {recomments?.result?.map((d, i) => (
              <ReCommentItem
                key={d.id}
                isLast={recomments.totalElements === i + 1}
                info={{
                  id: d.id,
                  content: d.content,
                  nickname: d.nickname,
                  createdAt: d.createdAt,
                }}
                webtoonId={webtoonId}
                episodeId={episodeId}
                parentCommentId={String(item.id)}
              />
            ))}
            <div className="relative px-10 pt-5 border-t border-[#F2F2F2]">
              <Textarea
                placeholder="대댓글을 입력해주세요"
                width="638px"
                height="130px"
                text={newReComment}
                onChange={(value) => setNewReComment(value)}
              />

              <div className="absolute bottom-4 right-7">
                <Button
                  props={{
                    variant: 'brand-yellow',
                    size: 'S',
                    onClick: () => {
                      mutationWebtoon.mutate({
                        webtoonId,
                        episodeId,
                        content: newReComment,
                        commentId: String(item.id),
                      });
                      setNewReComment(' ');
                    },
                  }}
                >
                  대댓글 남기기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CommentItemGroup;
