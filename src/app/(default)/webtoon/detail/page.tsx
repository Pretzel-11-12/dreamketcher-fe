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
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { addRecentWebtoon } from '@/app/_lib/recentWebtoons';

import _ from 'lodash';
import { da } from '@faker-js/faker';

const dropdownOptions = [
  { label: '좋아요순', value: 'like' },
  { label: '최신순', value: 'recent' },
];

export default function Detail() {
  const [newComment, setNewComment] = useState('');
  const [isHeaderVisible, setHeaderVisible] = useState(true);
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

  // 웹툰 데이터가 로드되면 최근 본 웹툰에 추가
  useEffect(() => {
    if (data) {
      addRecentWebtoon({
        id: parseInt(webtoonId),
        image: data.webtoonThumbnail || '',
        title: data.webtoonTitle || '',
        writer: data.authorName || '',
        episodeCount: parseInt(episodeId),
        averageRating: data.averageStar || 0,
        stars: data.likeCount || 0,
        genre: data.genre || '',
        lastViewedAt: parseInt(episodeId),
      });
    }
  }, [data, webtoonId, episodeId]);

  return (
    <>
      <EpisodeHeader
        item={{ webtoonId, episodeTitle: data?.title, episodeNo: data?.no }}
        isVisible={isHeaderVisible}
      />
      <div
        className="flex flex-col bg-[#FAFAFA] w-full items-center"
        onClick={() => setHeaderVisible((prev) => !prev)}
      >
        <div className="w-full flex items-center justify-center bg-white pb-10 pt-[100px]">
          <div className="w-[720px] flex flex-col gap-[100px] items-center justify-center text-md">
            {_.isString(data?.content) ? (
              <Image
                alt={data.title}
                src={data?.content}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              data?.content.map((c) => (
                <Image
                  key={c}
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
        {/* divider */}
        <div
          className="w-full h-[15px] bg-[##FAFAFA]"
          style={{
            boxShadow: 'inset 0px 0px 4px 0px rgba(121, 121, 121, 0.10)',
          }}
        >
          {/* divider */}
        </div>
        <div className="w-full flex items-center justify-center bg-white pt-10">
          <div className="w-[720px] flex flex-col gap-16 items-center justify-center text-md">
            <div className="h-full w-full flex flex-col pb-18 gap-1">
              <div className="h-[132px] p-5 border border-[#F2F2F2] rounded-md">
                <div className="text-base/[19px] font-medium pb-[15px]">
                  작가의 말
                </div>
                <WriterInfoItem
                  authorImage={data?.authorImage || ''}
                  name={data?.authorName || ''}
                  story={data?.authorNote || ''}
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
                      containerStyles: 'w-[79px] h-7 text-xs/[14px]',
                      onClick: () => {
                        mutationWebtoon.mutate({
                          webtoonId,
                          episodeId,
                          content: newComment,
                        });
                        setNewComment(' ');
                      },
                      disabled: !newComment.trim(),
                    }}
                  >
                    댓글 남기기
                  </Button>
                </div>
              </div>

              <div className="pt-[46px] mb-4">
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
                size: 'S',
                variant: 'brand-yellow',
                containerStyles:
                  '!w-[143px] h-[40px] flex items-center justify-center gap-2',
              }}
            >
              댓글 더보기
              <Image
                src="/assets/icon/downArrow-white.svg"
                alt="Down Arrow"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      </div>
      <EpisodeFooter />
    </>
  );
}
