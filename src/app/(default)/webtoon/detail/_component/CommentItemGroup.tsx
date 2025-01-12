import { fetchComment } from '@/app/api/fetchComment';
import Image from 'next/image';
import CommentItem from './CommentItem';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export interface CommentInfo {
  id: number;
  nickname: string;
  content: string;
  timestamp: number;
  like: number;
}
export default function CommentItemGroup({
  id,
  nickname,
  content,
  timestamp,
  like,
}: CommentInfo) {
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('titleId')!;
  const episodeId = searchParams.get('no')!;

  const [enableRecomments, setEnableRecomments] = useState(false);
  const [recomments, setRecomments] = useState([]);

  const { data } = useQuery({
    queryKey: [webtoonId, episodeId, 'recomments'],
    queryFn: () =>
      fetchComment.getReComments({
        param: { webtoonId, episodeId, commentId: id },
        query: { size: 20, page: 1, order: 'DESC' },
      }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: enableRecomments,
  });
  return (
    <div>
      <CommentItem
        info={{ id, content, nickname, timestamp, like }}
        children={
          <div className="flex gap-2">
            <div className="text-xs flex items-center gap-1.5 cursor-pointer">
              <span className="mdi mdi-comment-processing-outline text-sm text-gray-400" />
              답글
            </div>
            <div className="text-xs flex items-center gap-0.5 cursor-pointer">
              <Image
                src="/assets/icon/like.svg"
                alt="like"
                width={20}
                height={20}
              />
              좋아요 (아직 API 없음)
            </div>
          </div>
        }
      />

      {data &&
        data.result?.map((d) => (
          <CommentItem
            info={{
              id: d.id,
              content: d.content,
              nickname: d.nickname,
              timestamp: 0,
              like: 0,
            }}
            children={
              <div className="flex gap-2">
                <div className="text-xs flex items-center gap-0.5 cursor-pointer">
                  <Image
                    src="/assets/icon/like.svg"
                    alt="like"
                    width={20}
                    height={20}
                  />
                  좋아요 (아직 API 없음)
                </div>
              </div>
            }
          />
        ))}
    </div>
  );
}
