'use client';
import Button from '@/app/_component/Button';
import Input from '@/app/_component/Input';
import RadioButton from '@/app/_component/RadioButton';
import ThumbnailUploader from '../../_component/ThumbnailUploader';
import DateTimeSelector from './DateTimeSelector/DateTimeSelector';
import { useState } from 'react';
import { fetchCreatorEpisode } from '@/app/api/fetchCreator';
import { useRouter } from 'next/navigation';

export interface EpisodeFormInfo {
  webtoonId: string;
  title: string;
  thumbnail: string;
  content: string[];
  authorNote: string;
  publishedAt: string;
}
const EpisodeForm = (item: EpisodeFormInfo, index: number) => {
  const [episodeInfo, setEpisodeInfo] = useState<EpisodeFormInfo>({
    webtoonId: item.webtoonId || '',
    title: item.title || '',
    thumbnail: item.thumbnail || '',
    content: item.content || '',
    authorNote: item.authorNote || '',
    publishedAt: item.publishedAt || '',
  });
  const isExist = !!item;
  const router = useRouter();

  const handleEpisode = async () => {
    try {
      const response = await fetchCreatorEpisode.postEpisode(episodeInfo);
      if (response.id) {
        alert('작품이 등록되었습니다');
        router.push(`/creator/series`);
      }
    } catch (e) {}
  };

  const [publicSetting, setPublicSetting] = useState('public');
  return (
    <div className="flex flex-col w-full gap-12 pb-20">
      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>회차 제목</div>
        <Input
          placeholder="제목을 입력해주세요."
          subText="0/30"
          text={episodeInfo.title}
          onChange={(title) => setEpisodeInfo((v) => ({ ...v, title }))}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>회차 번호</div>
        <Input text={String(index)} />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>회차 썸네일</div>
        <ThumbnailUploader
          _preview={item.thumbnail}
          onFileSelect={() => {}}
          imageFormat={{ width: 400, height: 240 }}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>원고 등록</div>
        <ThumbnailUploader
          _preview={item.content?.[0]}
          onFileSelect={() => {}}
          imageFormat={{ width: 300, height: 300 }}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작가의 말</div>
        <Input
          placeholder="작가의 말을 작성해주세요."
          onChange={(authorNote) =>
            setEpisodeInfo((v) => ({ ...v, authorNote }))
          }
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start pb-[300px]">
        <div>공개 설정</div>
        <div className="flex flex-col gap-2 w-full">
          <RadioButton
            options={[
              { id: 'public', label: '공개' },
              { id: 'prvate', label: '비공개' },
              { id: 'scheduled', label: '예약공개' },
            ]}
            selectedValue={publicSetting}
            onChange={setPublicSetting}
          />
          {publicSetting === 'scheduled' && <DateTimeSelector />}
        </div>
      </div>

      <Button
        props={{
          size: 'L',
          variant: 'brand-yellow',
          handleClick: handleEpisode,
        }}
      >
        회차 등록하기
      </Button>
    </div>
  );
};

export default EpisodeForm;
