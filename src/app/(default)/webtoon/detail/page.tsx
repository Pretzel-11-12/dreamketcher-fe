'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import WriterInfoItem from './_component/WriterInfoItem';
import CommentItemGroup from './_component/CommentItemGroup';
import EpisodeButtonGroup from './_component/EpisodeButtonGroup';
import Button from '@/app/_component/Button';
import Textarea from '@/app/_component/Textarea';
import Dropdown from '@/app/_component/Dropdown';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import EpisodeHeader from './_component/EpisodeHeader';
import EpisodeFooter from './_component/EpisodeFooter';
import { fetchComment } from '@/app/api/fetchComment';
import { useState } from 'react';
import Image from 'next/image';

import _ from 'lodash';
import { da } from '@faker-js/faker';

const dropdownOptions = [
  { label: '좋아요순', value: 'like' },
  { label: '최신순', value: 'recent' },
];

export default function Detail() {
  const [newComment, setNewComment] = useState('');
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('titleId')!;
  const episodeId = searchParams.get('no')!;

  const { data, isLoading, isError } = useQuery({
    queryKey: [webtoonId, episodeId, 'detail'],
    queryFn: () =>
      fetchWebtoonDetail.getEpisodeDetails({ webtoonId, episodeId }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
  const { data: comments } = useQuery({
    queryKey: [webtoonId, episodeId, 'comments'],
    queryFn: () =>
      fetchComment.getComments({
        param: { webtoonId, episodeId },
        query: { size: 20, page: 0, order: 'DESC' },
      }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const { totalElements, result } = comments || {
    totalElements: 0,
    result: [],
  };
  const queryClient = useQueryClient();

  const mutationWebtoon = useMutation({
    mutationFn: (arg: {
      webtoonId: string;
      episodeId: string;
      content: string;
    }) =>
      fetchComment.postComment({
        param: {
          webtoonId: arg.webtoonId,
          episodeId: arg.episodeId,
          content: arg.content,
        },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [webtoonId, episodeId, 'comments'],
      }),
    onError: (e) => console.log(e),
  });

  return (
    <>
      <EpisodeHeader
        item={{ webtoonId, episodeTitle: data?.title, episodeNo: data?.no }}
      />
      <div className="flex flex-col bg-[#FAFAFA] gap-5 w-full items-center">
        <div className="w-full flex items-center justify-center bg-white pb-10 shadow-[0px_4px_10px_rgba(0,0,0,0.04)] pt-[100px] ">
          <div className="w-[800px] flex flex-col gap-16 items-center justify-center text-md">
            {_.isString(data?.content) ? (
              <Image
                alt={''}
                src={data?.content}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              data?.content.map((c, i) => (
                <Image
                  key={`${i}`}
                  alt={''}
                  src={c}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              ))
            )}
            <EpisodeButtonGroup
              webtoonId={webtoonId}
              episodeId={episodeId}
              likeCount={data?.likeCount || 0}
              averageStar={data?.averageStar || 0}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-center bg-white pt-14 shadow-[0_-4px_10px_rgba(0,0,0,0.04)]">
          <div className="w-[800px] flex flex-col gap-16 items-center justify-center text-md">
            <div className="h-full w-full flex flex-col pb-18 gap-1">
              <div className="p-5 border border-[#F2F2F2] rounded-md">
                <div className="text-[16px] font-medium pb-2">작가의 말</div>
                <WriterInfoItem
                  authorImage={data?.authorImage || ''}
                  name={data?.authorName || ''}
                  description={data?.authorNote || ''}
                />
              </div>

              <div className="text-md font-medium pt-10 pb-2">
                {totalElements}개의 댓글
              </div>
              <div className="relative">
                <Textarea
                  placeholder="댓글을 입력해주세요"
                  height="130px"
                  text={newComment}
                  onChange={(value) => setNewComment(value)}
                />

                <div className="absolute bottom-4 right-4">
                  <Button
                    props={{
                      variant: 'brand-yellow',
                      size: 'S',
                      onClick: () => {
                        mutationWebtoon.mutate({
                          webtoonId,
                          episodeId,
                          content: newComment,
                        });
                        setNewComment(' ');
                      },
                    }}
                  >
                    댓글 남기기
                  </Button>
                </div>
              </div>

              <div className="pt-8">
                <Dropdown options={dropdownOptions} defaultOption="like" />
              </div>

              <div className="flex flex-col gap-2">
                {result?.map((comment) => (
                  <CommentItemGroup item={comment} key={comment.id} />
                ))}
              </div>
            </div>
            <Button
              props={{
                size: 'L',
                variant: 'brand-yellow',
                containerStyles: 'w-fit px-20',
              }}
            >
              다음화 보기
            </Button>
          </div>
        </div>
      </div>
      <EpisodeFooter />
    </>
  );
}
