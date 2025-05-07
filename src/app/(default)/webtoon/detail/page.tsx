'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import WriterInfoItem from './_component/WriterInfoItem';
import CommentItemGroup from './_component/CommentItemGroup';
import EpisodeButtonGroup from './_component/EpisodeButtonGroup';
import Button from '@/app/_component/Button';
import Textarea from '@/app/_component/Textarea';
import Dropdown from '@/app/_component/Dropdown';
import { useSearchParams } from 'next/navigation';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import EpisodeHeader from './_component/EpisodeHeader';
import EpisodeFooter from './_component/EpisodeFooter';
import { fetchComment } from '@/app/api/fetchComment';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { addRecentWebtoon } from '@/app/_lib/recentWebtoons';

import _ from 'lodash';

const dropdownOptions = [
  { label: '좋아요순', value: 'like' },
  { label: '최신순', value: 'recent' },
];

export default function Detail() {
  const commentRef = useRef<HTMLDivElement>(null);

  const [newComment, setNewComment] = useState('');
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [showAllComments, setShowAllComments] = useState(false);
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('titleId')!;
  const episodeId = searchParams.get('no')!;

  const episodeListData = [
    {
      id: '1',
      title: '1화',
      description: '1화 설명',
      image: '/assets/images/episode-1.jpg',
    },
    {
      id: '2',
      title: '2화',
      description: '1화 설명',
      image: '/assets/images/episode-2.jpg',
    },
    {
      id: '3',
      title: '3화',
      description: '1화 설명',
      image: '/assets/images/episode-3.jpg',
    },
    {
      id: '4',
      title: '4화',
      description: '1화 설명',
      image: '/assets/images/episode-4.jpg',
    },
  ];

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

  // const displayedComments = showAllComments ? result : result.slice(0, 10);

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
        writer: data.authorNickname || '',
        episodeCount: parseInt(episodeId),
        averageRating: data.averageStar || 0,
        stars: data.interestCount || 0,
        genre: data.genre || '',
        lastViewedAt: parseInt(episodeId),
      });
    }
  }, [data, webtoonId, episodeId]);

  const handleScrollToComment = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        <div className="w-full flex items-center justify-center bg-white">
          <div className="w-[720px] mx-auto flex gap-[21px] items-center justify-between py-[20px] px-[10px] bg-white mb-10 border border-1 border-[#f2f2f2] rounded-[5px]">
            <Image
              src="/assets/icon/arrow-up.svg"
              alt="rightArrow"
              width={24}
              height={24}
              className="cursor-pointer -rotate-90"
            />
            <div className="flex gap-[30px]">
              {episodeListData.map((episode) => (
                <div key={episode.id}>
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-[130px] h-[78px]"
                  />
                  <p className="text-[14px] text-[#282828] hover:text-brand-yellow mt-[10px]">
                    {episode.id}화 - {episode.title}
                  </p>
                </div>
              ))}
            </div>
            <Image
              src="/assets/icon/arrow-up.svg"
              alt="rightArrow"
              width={24}
              height={24}
              className="cursor-pointer rotate-90"
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
          <div className="w-[720px] flex flex-col gap-[50px] items-center justify-center text-md">
            <div className="h-full w-full flex flex-col pb-18 gap-1">
              <div
                className="h-[132px] p-5 border border-[#F2F2F2] rounded-md"
                ref={commentRef}
              >
                <div className="text-base/[19px] text-[#282828] font-medium pb-[15px]">
                  작가의 말
                </div>
                <WriterInfoItem
                  authorImage={data?.authorImage || ''}
                  name={data?.authorNickname || ''}
                  story={data?.authorNote || ''}
                />
              </div>

              <div className="text-md text-[#282828] font-medium mt-[46px] pb-2">
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

              {totalElements === 0 ? (
                <div className="text-center text-[#C9C9C9] text-sm mt-[74px]">
                  <p>이번 화의 댓글이 아직 없습니다.</p>
                  <p>첫 댓글을 남겨보세요.</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {result?.map((comment) => (
                    <CommentItemGroup item={comment} key={comment.id} />
                  ))}
                </div>
              )}
            </div>

            {totalElements > 10 && !showAllComments && (
              <Button
                props={{
                  size: 'S',
                  variant: 'brand-yellow',
                  containerStyles:
                    '!w-[143px] h-[40px] flex items-center justify-center gap-2',
                  onClick: () => setShowAllComments(true),
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
            )}
          </div>
        </div>
      </div>
      <EpisodeFooter
        isVisible={isHeaderVisible}
        setVisible={setHeaderVisible}
        onClickComment={handleScrollToComment}
      />
    </>
  );
}
