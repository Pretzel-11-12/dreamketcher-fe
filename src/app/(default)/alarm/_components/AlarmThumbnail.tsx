'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Alarm {
  id: number;
  type:
    | 'UPDATE'
    | 'BEST_COMMENT'
    | 'NEW_COMMENT'
    | 'FAVORITE_WEBTOON'
    | 'COMMENT_WRITTEN'
    | 'COMMENT_RECOMMEND'
    | 'COMMENT_LIKE'
    | 'COMMENT_DISLIKE'
    | 'COMMENT_REPORT'
    | 'COMMENT_DELETE'
    | 'COMMENT_EDIT'
    | 'REPLY_WRITTEN';
  imgUrl: string;
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

type AlarmThumbnailProps = {
  alarm: Alarm;
  markAsRead: (id: number) => void;
  removeAlarm: (id: number) => void;
};

const AlarmThumbnail: React.FC<AlarmThumbnailProps> = ({
  alarm,
  markAsRead,
  removeAlarm,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = React.useState(false);

  const typeToKorean = {
    UPDATE: '업데이트',
    BEST_COMMENT: '배댓 선정',
    NEW_COMMENT: '새 댓글',
    FAVORITE_WEBTOON: '관심 웹툰',
    COMMENT_WRITTEN: '댓글',
    COMMENT_RECOMMEND: '댓글 추천',
    COMMENT_LIKE: '댓글 좋아요',
    COMMENT_DISLIKE: '댓글 싫어요',
    COMMENT_REPORT: '댓글 신고',
    COMMENT_DELETE: '댓글 삭제',
    COMMENT_EDIT: '댓글 수정',
    REPLY_WRITTEN: '답댓',
  };

  // 날짜 차이를 계산하는 함수
  const calculateDaysAgo = (dateString: string) => {
    const alarmDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - alarmDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  return (
    <div
      className="w-full flex justify-between items-center border-b border-[#f2f2f2]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full flex flex-col gap-5">
        <div className="relative flex w-full h-[160px] cursor-pointer gap-[30px] py-5">
          {alarm.imgUrl ? (
            <div className="relative w-[80px] h-[120px] rounded-[5px] overflow-hidden">
              <Image alt={'Search webtoon thumbnail'} src={alarm.imgUrl} fill />
            </div>
          ) : (
            <div className="relative w-[80px] h-[80px] my-auto overflow-hidden">
              <Image
                alt={'Search webtoon thumbnail'}
                src={'/assets/images/alarm-default.png'}
                fill
              />
            </div>
          )}
          {!alarm.isRead && (
            <div className="absolute top-[20px] left-[85px] w-[9px] h-[9px] bg-[#FBA250] rounded-full"></div>
          )}
          <div className="flex flex-col text-xs justify-between">
            <div className="flex flex-col gap-[10px]">
              <p
                className={`text-[18px] leading-[normal] font-medium ${
                  alarm.isRead ? 'text-[#888888]' : 'text-titleBlack'
                }`}
              >
                [{typeToKorean[alarm.type]}] {alarm.title}
              </p>
              <p
                className={`text-[16px] font-normal ${
                  alarm.isRead ? 'text-basicGray' : 'text-contentBlack'
                }`}
              >
                {alarm.content}
              </p>
            </div>
            <p className="text-inActive">
              {calculateDaysAgo(alarm.createdAt)}일 전
            </p>
          </div>
        </div>
      </div>
      <div className="h-full py-[20px] flex gap-[6px] items-start">
        {!alarm.isRead && (
          <button
            className="w-6 h-6 rounded-full"
            onClick={() => markAsRead(alarm.id)}
          >
            <Image
              alt={'Search webtoon thumbnail'}
              src={
                isHovered
                  ? '/assets/icon/tick-circle-yellow.png'
                  : '/assets/icon/tick-circle.png'
              }
              width={24}
              height={24}
            />
          </button>
        )}
        <button
          className="w-6 h-6 rounded-full"
          onClick={() => removeAlarm(alarm.id)}
        >
          <Image
            alt={'Search webtoon thumbnail'}
            src={
              isHovered
                ? '/assets/icon/close-circle-yellow.png'
                : '/assets/icon/close-circle.png'
            }
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};

export default AlarmThumbnail;
