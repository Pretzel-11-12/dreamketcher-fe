import { fetchComment } from '@/app/api/fetchComment';
import Image from 'next/image';
import 'moment/locale/ko';
import moment from 'moment';

type CommentInfoType = {
  info: fetchComment.Model.ResCommentUnit;
  handleClick: () => void;
};
const CommentItem: React.FC<CommentInfoType> = ({ info, handleClick }) => {
  moment.locale('ko');
  const timeAgo = moment(info.createdAt).fromNow();

  return (
    <div className="grid grid-cols-[auto_1fr] py-4 gap-2 border-b border-gray-500/10">
      <span className="mdi mdi-account-circle text-gray-600/50 text-[40px] -mt-3"></span>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div className="text-[14px]">{info.nickname}</div>
          <div className="text-[12px] text-gray-500">{timeAgo}</div>
        </div>

        <div className="text-[13px]">{info.content}</div>
        <div className="flex gap-4 text-[#888888]">
          <div
            className="text-xs flex items-center gap-1 cursor-pointer"
            onClick={handleClick}
          >
            <Image
              src="/assets/icon/inactiveMessage.svg"
              alt="like"
              width={13}
              height={13}
            />
            답글
          </div>
          <div className="text-xs flex items-center gap-1 cursor-pointer">
            <Image
              src="/assets/icon/inactiveLike.svg"
              alt="like"
              width={13}
              height={13}
            />
            좋아요
          </div>
          <div className="text-xs flex items-center gap-1 cursor-pointer">
            <Image
              src="/assets/icon/inactiveDislike.svg"
              alt="like"
              width={13}
              height={13}
            />
            싫어요
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
