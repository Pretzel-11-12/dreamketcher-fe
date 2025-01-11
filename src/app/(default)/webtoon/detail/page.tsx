'use client';

import WriterInfoItem, { UserInfo } from './_component/WriterInfoItem';
import CommentListItem, { CommentInfo } from './_component/CommentListItem';
import EpisodeButtonGroup from './_component/EpisodeButtonGroup';
import Button from '@/app/_component/Button';
import Textarea from '@/app/_component/Textarea';
import Dropdown from '@/app/_component/Dropdown';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import DefaultImage from '@/app/_component/DefaultImage';
import EpisodeHeader from './_component/EpisodeHeader';
import EpisodeFooter from './_component/EpisodeFooter';
import { fetchComment } from '@/app/api/fetchComment';
import { useState } from 'react';

const episodeData = {
  title: '',
  images: [],
  writerInfo: {
    name: '바크베',
    description: '안녕하새우',
  },
  detail: { like: 38, interest: 1147, star: 4.85 },
};

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
        query: { size: 20, page: 1, order: 'DESC' },
      }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const { totalElements, result } = comments || {
    totalElements: 0,
    result: [],
  };

  return (
    <>
      <EpisodeHeader
        item={{ webtoonId, episodeTitle: data?.title, episodeNo: data?.no }}
      />
      <div className="flex flex-col bg-[#FAFAFA] gap-5 w-full items-center">
        <div className="w-full flex items-center justify-center bg-white pb-10 shadow-[0px_4px_10px_rgba(0,0,0,0.04)] pt-[100px] ">
          <div className="w-[800px] flex flex-col gap-16 items-center justify-center text-md">
            {data?.content.map((c, i) => (
              <DefaultImage key={`${i}`} src={c} alt="" />
            ))}
            <EpisodeButtonGroup webtoonId={webtoonId} episodeId={episodeId} />
          </div>
        </div>

        <div className="w-full flex items-center justify-center bg-white pt-14 shadow-[0_-4px_10px_rgba(0,0,0,0.04)]">
          <div className="w-[800px] flex flex-col gap-16 items-center justify-center text-md">
            <div className="h-full w-full flex flex-col pb-18 gap-1">
              <div className="p-5 border border-[#F2F2F2] rounded-md">
                <div className="text-[16px] font-medium pb-2">작가의 말</div>
                <WriterInfoItem
                  name={episodeData.writerInfo?.name}
                  description={episodeData.writerInfo?.description}
                />
              </div>

              <div className="text-md font-medium pt-10 pb-2">
                {totalElements}개의 댓글
              </div>
              <div className="relative">
                <Textarea
                  placeholder="댓글을 입력해주세요"
                  height="130px"
                  onChange={(value) => setNewComment(value)}
                />

                <div className="absolute bottom-4 right-4">
                  <Button
                    props={{
                      variant: 'brand-yellow',
                      size: 'S',
                      onClick: () =>
                        fetchComment.postComment({
                          param: { webtoonId, episodeId, content: newComment },
                        }),
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
                  <CommentListItem
                    id={comment.id}
                    name={comment.nickname}
                    description={comment.content}
                    like={0}
                    timestamp={0}
                  />
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
