import 'moment/locale/ko';
import moment from 'moment';
import Image from 'next/image';

export interface CommentInfo {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
}

type ReCommentInfoType = {
  info: CommentInfo;
  isLast: boolean;
};
const ReCommentItem: React.FC<ReCommentInfoType> = ({ info, isLast }) => {
  moment.locale('ko');
  const timeAgo = moment(info.createdAt).fromNow();
  return (
    <div
      className={`grid grid-cols-[auto_auto_1fr] py-4 gap-2 ${
        !isLast && 'border-b'
      }`}
    >
      <div className="w-4 h-4 border-l border-b rounded-sm" />
      <span className="mdi mdi-account-circle text-gray-600/50 text-[40px] -mt-3"></span>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div className="text-[14px]">{info.nickname}</div>
          <div className="text-[12px] text-gray-500">{timeAgo}</div>
        </div>

        <div className="text-[13px]">{info.content}</div>

        <div className="flex gap-2">
          <div className="text-xs flex items-center gap-0.5 cursor-pointer">
            <Image
              src="/assets/icon/like.svg"
              alt="like"
              width={20}
              height={20}
            />
            좋아요
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReCommentItem;
