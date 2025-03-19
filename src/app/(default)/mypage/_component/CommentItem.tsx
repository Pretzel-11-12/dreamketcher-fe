import Image from 'next/image';
import React from 'react';
import useAuthStore from '@/app/store/authStore';
import moment from 'moment-timezone';
import { _Model } from '@/app/api/fetchComment/model';
import { router } from 'next/client';
import ResMyCommentsUnit = _Model.ResMyCommentsUnit;

const CommentItem: React.FC<ResMyCommentsUnit> = ({
  id,
  no,
  content,
  title,
  episodeTitle,
  episodeThumbnail,
  createdAt,
  recommendationCount,
  notRecommendationCount,
  childCommentCount,
}) => {

  const { nickname, imageUrl } = useAuthStore();
  moment.locale('ko');

  const timeAgo = moment.utc(createdAt).tz('Asia/Seoul').fromNow();

  function navigateToEpisode() {
    router.push(`/webtoon/detail?titleId=${id}&no=${no}`);
  }

  return (
    <div className="border-b py-5">
      <div className="flex items-start gap-[14px]">
        <Image
          src={imageUrl || '/assets/images/profile-default.png'}
          alt="프로필 이미지"
          width={36}
          height={36}
          className="w-[36px] h-[36px] rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="text-sm/[17px] text-titleBlack">{nickname}</span>
            <span className="text-xs text-[#888888]">{timeAgo}</span>
          </div>
          <p className="text-[13px] text-[#3F3F3F] mt-2">{content}</p>
          <div className="flex mt-[22px]">
            <Image
              src={episodeThumbnail}
              alt="프로필 이미지"
              width={42}
              height={42}
              className="w-[70px] h-[42px] rounded-md cursor-pointer"
              onClick={navigateToEpisode}
            />
            <span
              className="h-5 text-[13px]/[16px] text-[#888888] mt-1 ml-2 cursor-pointer"
              onClick={navigateToEpisode}>[{title}] - {no}화 {episodeTitle}
            </span>
            <Image
              src="/assets/icon/arrow-right-gray.svg"
              alt="rightArrow"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer"
              onClick={navigateToEpisode}
            />
          </div>
          <div className="h-5 flex items-center text-xs text-[#888888] gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Image
                src={'/assets/icon/inactiveMessage.svg'}
                alt="Message Icon"
                width={11}
                height={11}
              />
              <span className="mt-[2px]">{childCommentCount > 0 ? childCommentCount : '답글'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={'/assets/icon/inactiveLike.svg'}
                alt="Like Icon"
                width={11}
                height={11}
              />
              <span className="mt-[2px]">{recommendationCount > 0 ? recommendationCount : '좋아요'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={'/assets/icon/inactiveDislike.svg'}
                alt="Dislike Icon"
                width={11}
                height={11}
              />
              <span className="mt-[2px]">{notRecommendationCount > 0 ? notRecommendationCount : '싫어요'}</span>
            </div>
            <Image
              src={'/assets/icon/meatballsMenu.svg'}
              alt="meatballsMenu Icon"
              width={25}
              height={25}
              className="ml-auto px-1 py-1 rounded hover:bg-[#F2F2F2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
