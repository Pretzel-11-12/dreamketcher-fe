'use client';

import Button from '@/app/_component/Button';
import Input from '@/app/_component/Input';
import RadioButton from '@/app/_component/RadioButton';
import ThumbnailUploader from '../../_component/ThumbnailUploader';
import DateTimeSelector from './DateTimeSelector/DateTimeSelector';
import { useEffect, useState } from 'react';
import { fetchCreatorEpisode } from '@/app/api/fetchCreator';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import _ from 'lodash';
import moment from 'moment';
import EpisodeUploader from './EpisodeUploader';

export interface EpisodeFormInfo {
  webtoonId: string;
  title?: string;
  thumbnail?: string;
  content?: string[];
  authorNote?: string;
  publishedAt?: string;
}

export interface EpisodeResProps {
  item?: fetchWebtoonDetail.Model.EpisodeDetail;
  episodeId: string;
  webtoonId: string;
}

const EpisodeForm: React.FC<EpisodeResProps> = ({
  item,
  webtoonId,
  episodeId,
}) => {
  const [episodeInfo, setEpisodeInfo] = useState<EpisodeFormInfo>({
    webtoonId: webtoonId,
    title: '',
    thumbnail: '',
    content: [],
    authorNote: '',
    publishedAt: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
  });

  const searchParams = useSearchParams();
  const no = searchParams.get('no') || String(item?.no);
  const [status, setStatus] = useState<'edit' | 'new'>('new');

  useEffect(() => {
    if (!!item) {
      setEpisodeInfo({
        webtoonId: webtoonId,
        title: item.title || '',
        thumbnail: item.thumbnail || '',
        content: item?.content || '',
        authorNote: item.authorNote || ' ',
        publishedAt: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
      });
      setStatus('edit');
    }
  }, [item]);

  const isExist = !!item;
  const router = useRouter();

  const handleThumbnail = async (file: File | null) => {
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append('thumbnail', file);

      try {
        const s3Url = await fetchCreatorEpisode.postEpisodeThumbnail({
          webtoonId: webtoonId,
          formData,
        });

        setEpisodeInfo((v) => ({
          ...v,
          thumbnail: s3Url,
        }));
      } catch (e) {
        console.log(e);
      }
    }
  };
  const getContentURL = async (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append('content', file);

      try {
        const s3Url = await fetchCreatorEpisode.postEpisodeContent({
          webtoonId: webtoonId,
          formData,
        });

        return s3Url[0];
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleEpisode = async () => {
    console.log({ status });
    try {
      if (status === 'edit') {
        await fetchCreatorEpisode.editEpisode({
          item: episodeInfo,
          episodeId,
        });

        alert('에피소드가 수정 되었습니다');
        router.push(`/creator/episode?webtoonId=${webtoonId}`);
      } else {
        const response = await fetchCreatorEpisode.postEpisode(episodeInfo);

        if (response.id) {
          alert('작품이 등록되었습니다');
          router.push(`/creator/episode?webtoonId=${webtoonId}`);
        }
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
          maxLength={30}
          subText={`${episodeInfo.title?.length}/30`}
          text={episodeInfo.title}
          onChange={(title) => setEpisodeInfo((v) => ({ ...v, title }))}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>회차 번호</div>

        <div className="flex flex-col gap-2">
          <Input text={no} disable width="101px" />
          <span className="text-xs text-[#C9C9C9]">
            회차번호는 순차적으로 자동 지정되므로 수정이 불가합니다
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>회차 썸네일</div>
        <ThumbnailUploader
          _preview={episodeInfo.thumbnail}
          onFileSelect={handleThumbnail}
          imageFormat={{ width: 200, height: 120 }}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>원고 등록</div>
        <div>
          <EpisodeUploader
            images={episodeInfo.content || []}
            onChange={(images) =>
              setEpisodeInfo((v) => ({ ...v, content: images }))
            }
            getContentURL={getContentURL}
          />
        </div>
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작가의 말</div>
        <Input
          text={episodeInfo.authorNote}
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
          {publicSetting === 'scheduled' && (
            <DateTimeSelector
              onChange={(time) => {
                setEpisodeInfo((v) => ({ ...v, publishedAt: time }));
              }}
            />
          )}
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
