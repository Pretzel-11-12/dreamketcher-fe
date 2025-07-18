'use client';

import Button from '@/app/_component/Button';
import Input from '@/app/_component/Input';
import RadioButton from '@/app/_component/RadioButton';
import ThumbnailUploader from '../../_component/ThumbnailUploader';
import { useEffect, useState } from 'react';
import { fetchCreatorEpisode } from '@/app/api/fetchCreator';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import _ from 'lodash';
import moment from 'moment';
import EpisodeUploader from './EpisodeUploader';
import PublicationSettings from './PublicationSettings';
import DateTimeSelector from './DateTimeSelector/DateTimeSelector';
import CicularRadioButton from '@/app/_component/CicularRadioButton';

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
  const [seriesStatus, setSeriesStatus] = useState<'ongoing' | 'completed'>(
    'ongoing'
  );

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

  // const isExist = !!item;
  const router = useRouter();

  const handleThumbnail = async (file: File | null) => {
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
  const formData = new FormData();
  const getContentURL = async (files: File[] | null) => {
    if (files) {
      files.map((file) => formData.append('content', file));
      console.log(formData);
      try {
        const s3Url = await fetchCreatorEpisode.postEpisodeContent({
          webtoonId: webtoonId,
          formData,
        });

        return s3Url;
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
  const [isScheduledEnabled, setIsScheduledEnabled] = useState(true);

  return (
    <div className="flex flex-col w-full gap-[50px] pb-20">
      <div className="grid grid-cols-[10rem_1fr] items-center gap-[10px]">
        <div className="font-medium text-[16px] font-[#3F3F3F]">회차 제목</div>
        <Input
          placeholder="제목을 입력해주세요."
          maxLength={30}
          currentTextLength={episodeInfo.title?.length}
          text={episodeInfo.title}
          onChange={(title) => setEpisodeInfo((v) => ({ ...v, title }))}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start gap-[10px]">
        <div className="font-medium text-[16px] font-[#3F3F3F]">회차 번호</div>

        <div className="flex flex-col gap-2">
          <Input text={no} disable width="101px" />
          <span className="text-xs text-[#C9C9C9]">
            회차번호는 순차적으로 자동 지정되므로 수정이 불가합니다
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start gap-[10px]">
        <div className="font-medium text-[16px] font-[#3F3F3F]">
          회차 썸네일
        </div>
        <ThumbnailUploader
          _preview={episodeInfo.thumbnail}
          onFileSelect={handleThumbnail}
          imageFormat={{ width: 200, height: 120 }}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start gap-[10px]">
        <div className="font-medium text-[16px] font-[#3F3F3F]">원고 등록</div>
        <div className="font-medium text-[16px] font-[#3F3F3F]">
          <EpisodeUploader
            images={episodeInfo.content || []}
            onChange={(images) =>
              setEpisodeInfo((v) => ({ ...v, content: images }))
            }
            getContentURL={getContentURL}
          />
        </div>
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-center gap-[10px]">
        <div className="font-medium text-[16px] font-[#3F3F3F]">작가의 말</div>
        <Input
          maxLength={100}
          currentTextLength={episodeInfo.authorNote?.length}
          text={episodeInfo.authorNote}
          placeholder="작가의 말을 작성해주세요."
          onChange={(authorNote) =>
            setEpisodeInfo((v) => ({ ...v, authorNote }))
          }
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-center gap-[10px]">
        <div className="font-medium text-[16px] font-[#3F3F3F] self-start">
          공개 설정
        </div>
        <div className="flex flex-col gap-[20px] min-h-[150px]">
          <div className="w-[720px]">
            <CicularRadioButton
              options={[
                { id: 'public', label: '공개' },
                { id: 'prvate', label: '비공개' },
                { id: 'scheduled', label: '예약 공개' },
              ]}
              selectedValue={publicSetting}
              onChange={setPublicSetting}
            />
          </div>
          <div className="w-[320px]">
            {publicSetting === 'scheduled' && (
              <DateTimeSelector
                onChange={(time) => {
                  setEpisodeInfo((v) => ({ ...v, publishedAt: time }));
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Button
          props={{
            size: 'L',
            variant: 'brand-yellow',
            handleClick: handleEpisode,
            containerStyles: 'w-[390px]',
          }}
        >
          회차 등록하기
        </Button>
      </div>
    </div>
  );
};

export default EpisodeForm;
