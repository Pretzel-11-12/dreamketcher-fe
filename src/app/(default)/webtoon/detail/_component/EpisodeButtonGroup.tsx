'use client';
import { useState } from 'react';
import EpisodeButton, { EpisodeButtonItemInfo } from './EpisodeButton';
import StarRatingModal from './StarRatingModal';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

type EpisodeButtonGroupProp = {
  webtoonId: string;
  episodeId: string;
  likeCount: number;
  averageStar: number;
};
const EpisodeButtonGroup: React.FC<EpisodeButtonGroupProp> = (items) => {
  const { webtoonId, episodeId } = items;
  const [isModalOpen, handleOpenModal] = useState<boolean>(false);

  const episodeButtonItems: EpisodeButtonItemInfo[] = [
    {
      text: '좋아요',
      handleClick: async () =>
        await fetchWebtoonDetail.favoriteEpisode({ webtoonId, episodeId }),
      icon: { src: '/assets/icon/inactiveLike-thin.svg', size: 20 },
      subText: String(items.likeCount),
    },
    {
      text: '관심웹툰',
      handleClick: () => {},
      icon: { src: '/assets/icon/add-circle.svg', size: 28 },
      subText: '1,140',
    },
    {
      text: '별점주기',
      handleClick: () => handleOpenModal(true),
      icon: { src: '/assets/icon/star.svg', size: 15, iconWithText: '4.95' },
      subText: String(items.averageStar),
    },
    {
      text: '신고하기',
      handleClick: () => {},
      icon: { src: '/assets/icon/report.svg', size: 34 },
    },
    {
      text: '공유하기',
      handleClick: () => {},
      icon: { src: '/assets/icon/export.svg', size: 34 },
    },
  ];

  return (
    <>
      <div className="bg-[#fffff] border rounded-md flex w-full h-[100px] hover:cursor-pointer">
        {episodeButtonItems.map((item, i) => (
          <EpisodeButton
            key={item.text}
            text={item.text}
            subText={item.subText}
            handleClick={item.handleClick}
            icon={item.icon}
            isActive={item.isActive}
            isLast={i === episodeButtonItems.length - 1}
          />
        ))}
      </div>

      <StarRatingModal
        isOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
        webtoonId={webtoonId}
        episodeId={episodeId}
      />
    </>
  );
};

export default EpisodeButtonGroup;
