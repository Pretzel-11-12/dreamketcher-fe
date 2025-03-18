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
  extends Omit<fetchCreatorWebtoon.Model.CreatorWebtoonDetail, 'id' | 'genre'> {
  genreId: string;
}

const options = [
  { label: '로맨스', id: '1', subId: 'PURE' },
  { label: '판타지', id: '2', subId: 'FANTASY' },
  { label: '무협', id: '3', subId: 'HISTORICAL' },
  { label: '일상', id: '4', subId: 'DAILY' },
  { label: '스릴러', id: '5', subId: 'THRILL' },
  { label: '액션', id: '6', subId: 'ACTION' },
  { label: '스포츠', id: '7', subId: 'SPORTS' },
  { label: '개그', id: '8', subId: 'COMIC' },
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
    genreId: '1',
  });
  const [status, setStatus] = useState<'edit' | 'new'>('new');
  const router = useRouter();

  useEffect(() => {
    if (!!item) {
      const genreId = options.find((v) => v.subId === item.genre)?.id || '1';

      setWebtoonInfo({ ...item, genreId: genreId });
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

          await fetchCreatorWebtoon.editWebtoonThumbnail({
            formData,
            webtoonId: item.id,
          });
        } else {
          formData.append('image', file);
          const s3Url = await fetchCreatorWebtoon.postWebtoonThumbnail({
            formData,
          });

          setWebtoonInfo((v) => ({
            ...v,
            thumbnail: s3Url,
            prologue: s3Url,
          }));
        }
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
      router.push(`/creator/series`);
    } catch (e) {
      alert(isEdit ? '작품 수정 실패하였습니다' : '작품 등록 실패하였습니다');
    }
  };

  return (
    <div className="flex flex-col w-full gap-12 pb-20 text-[16px]">
      <div className="grid grid-cols-[10rem_1fr] items-center">
        <div>작품제목</div>
        <Input
          maxLength={30}
          placeholder="제목을 입력해주세요."
          currentTextLength={webtoonInfo.title.length}
          text={webtoonInfo.title}
          onChange={(title) => setWebtoonInfo((v) => ({ ...v, title: title }))}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>장르</div>

        <RadioButton
          key={webtoonInfo.genreId}
          options={options}
          selectedValue={webtoonInfo.genreId}
          onChange={(id) => setWebtoonInfo((v) => ({ ...v, genreId: id }))}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-center">
        <div>이용가</div>
        <RadioButton
          options={[
            { id: 'all', label: '전체 이용가' },
            { id: 'adult', label: '성인' },
          ]}
          selectedValue={'all'}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품 표지</div>
        <ThumbnailUploader
          _preview={webtoonInfo.thumbnail}
          onFileSelect={handleThumbnail}
          imageFormat={{ width: 480, height: 720 }}
          dpImageFormat={{ width: 140 }}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품 설명</div>
        <Textarea
          text={webtoonInfo.story}
          placeholder="작품 설명에 필요한 내용을 작성해주세요."
          subText={`${webtoonInfo.story.length}/400`}
          maxLength={400}
          onChange={(story) => setWebtoonInfo((v) => ({ ...v, story: story }))}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div className="pt-2">작품 태그</div>
        <div className="flex flex-col gap-[12px]">
          <TagInput />
          <div className="flex rounded-md bg-brand-gray py-2.5 px-3 text-sm text-[#888888] w-full gap-2 items-center">
            <img src="/assets/images/alert-circle.svg" alt="Alert Icon" />
            <div className="w-full text-[13px]">
              태그는 쉼표를 통해 구분되며, 최대 10개까지 등록될 수 있습니다.
              하나의 태그는 최대 6자 이상을 넘기지 못합니다.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-center pb-24">
        <div>작품 상태</div>
        <RadioButton
          options={[
            { id: 'open', label: '공개' },
            { id: 'close', label: '비공개' },
          ]}
          selectedValue={'open'}
        />
      </div>

      <div className="flex justify-center">
        <div className="w-[319px] ">
          <Button
            props={{
              size: 'L',
              variant: 'brand-yellow',
              handleClick: handleWebtoon,
            }}
          >
            {!!item ? '작품 수정하기' : '작품 등록하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeriesForm;
