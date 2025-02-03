'use client';

import Button from '@/app/_component/Button';
import Input from '@/app/_component/Input';
import RadioButton from '@/app/_component/RadioButton';
import Textarea from '@/app/_component/Textarea';
import ThumbnailUploader from '../../_component/ThumbnailUploader';
import { useEffect, useState } from 'react';
import TagInput from './TagInput';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import { useRouter } from 'next/navigation';

export interface SeriesFormInfo
  extends Omit<fetchCreatorWebtoon.Model.CreatorWebtoonDetail, 'id'> {}

const options = [
  { label: '로맨스', id: '1' },
  { label: '판타지', id: '2' },
  { label: '무협', id: '3' },
  { label: '일상', id: '4' },
  { label: '스릴러', id: '5' },
  { label: '공포', id: '6' },
  { label: '액션', id: '7' },
  { label: '스포츠', id: '8' },
  { label: '개그', id: '9' },
  { label: '소년', id: '10' },
];

type SeriesFormProp = {
  item?: fetchCreatorWebtoon.Model.CreatorWebtoonDetail;
};

const SeriesForm: React.FC<SeriesFormProp> = ({ item }) => {
  const [webtoonInfo, setWebtoonInfo] = useState<SeriesFormInfo>({
    title: '',
    thumbnail: '',
    prologue: '',
    story: '',
    description: '',
    genreNames: [],
  });
  const [status, setStatus] = useState<'edit' | 'new'>('new');
  const router = useRouter();

  useEffect(() => {
    if (!!item) {
      setWebtoonInfo(item);
      setStatus('edit');
    }
  }, [item]);

  const handleThumbnail = async (file: File | null) => {
    if (file) {
      const isEdit = status === 'edit';

      const formData = new FormData();

      try {
        if (isEdit && item) {
          formData.append('newThumbnail', file);
          formData.append('oldThumbnail', item.thumbnail);
          formData.append('folderName', `/webtoon/${item.id}/thumbnail`);

          const s3Url = await fetchCreatorWebtoon.editWebtoonThumbnail({
            formData,
            webtoonId: item.id,
          });

          console.log(s3Url);
        } else {
          formData.append('image', file);
          const s3Url = await fetchCreatorWebtoon.postWebtoonThumbnail({
            formData,
          });

          setWebtoonInfo((v) => ({
            ...v,
            thumbnail: s3Url,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handlePrologue = async (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append('images', file);
      try {
        const s3Url = await fetchCreatorWebtoon.postWebtoonPrologue({
          formData,
        });

        setWebtoonInfo((v) => ({ ...v, prologue: s3Url }));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleWebtoon = async () => {
    const isEdit = status === 'edit';
    try {
      if (isEdit) {
        await fetchCreatorWebtoon.editWebtoon({
          webtoonId: item?.id!,
          body: webtoonInfo,
        });
      } else {
        await fetchCreatorWebtoon.postWebtoon(webtoonInfo);
      }
      alert(isEdit ? '작품이 수정되었습니다' : '작품이 등록되었습니다');
      router.push(`/creator/series?status=NEW`);
    } catch (e) {
      alert(isEdit ? '작품 수정 실패하였습니다' : '작품 등록 실패하였습니다');
    }
  };

  return (
    <div className="flex flex-col w-full gap-12 pb-20">
      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품제목</div>
        <Input
          placeholder="제목을 입력해주세요."
          subText="0/30"
          text={webtoonInfo.title}
          onChange={(title) => setWebtoonInfo((v) => ({ ...v, title: title }))}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>장르</div>
        <RadioButton options={options} />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>이용가</div>
        <RadioButton
          options={[
            { id: 'all', label: '전체 이용가' },
            { id: 'adult', label: '성인' },
          ]}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품 표지</div>
        <ThumbnailUploader
          _preview={webtoonInfo.thumbnail}
          onFileSelect={handleThumbnail}
          imageFormat={{ width: 480, height: 623 }}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>프롤로그</div>

        <ThumbnailUploader
          _preview={webtoonInfo.prologue[0]}
          onFileSelect={handlePrologue}
          imageFormat={{ width: 480 }}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-baseline">
        <div>작품 설명</div>
        <Textarea
          text={webtoonInfo.story}
          placeholder="작품 설명에 필요한 내용을 작성해주세요."
          subText="0/30"
          onChange={(story) => setWebtoonInfo((v) => ({ ...v, story: story }))}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품 한줄 설명</div>
        <Input
          text={webtoonInfo.description}
          placeholder="작품에 대한 설명을 한줄로 적어주세요."
          subText="0/400"
          onChange={(description) =>
            setWebtoonInfo((v) => ({ ...v, description: description }))
          }
        />
      </div>
      <div className="pb-24">
        <div className="grid grid-cols-[10rem_1fr] items-start pb-4">
          <div>작품 태그</div>
          <TagInput />
        </div>
        <div className="flex rounded-md bg-brand-gray py-2 px-3 text-sm text-gray-500 w-full gap-2 items-center">
          <span className="mdi mdi-alert-circle-outline text-lg"></span>
          <div className="w-full text-[13px]">
            태그는 쉼표를 통해 구분되며, 최대 10개까지 등록될 수 있습니다.
            하나의 태그는 최대 6자 이상을 넘기지 못합니다.
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Button
          props={{
            size: 'L',
            variant: 'brand-yellow',
            containerStyles: 'w-[300px]',
            handleClick: handleWebtoon,
          }}
        >
          작품 등록하기
        </Button>
      </div>
    </div>
  );
};

export default SeriesForm;
