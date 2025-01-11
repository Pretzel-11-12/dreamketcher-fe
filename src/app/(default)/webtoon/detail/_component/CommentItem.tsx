import { fetchComment } from '@/app/api/fetchComment';
import Image from 'next/image';

export interface CommentInfo {
  id: number;
  nickname: string;
  content: string;
  timestamp: number;
  like: number;
}

type CommentInfoType = {
  info: CommentInfo;
  children?: React.ReactNode;
};
const CommentItem: React.FC<CommentInfoType> = ({ info, children }) => {
  const time = new Date(info.timestamp).toISOString().split('T')[0];
  return (
    <div className="grid grid-cols-[auto_1fr] py-4 gap-2 border-b">
      <span className="mdi mdi-account-circle text-gray-600/50 text-[40px] -mt-3"></span>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div className="text-sm">{info.nickname}</div>
          <div className="text-sm">{time}</div>
        </div>

        <div className="text-sm">{info.content}</div>
        {children}
      </div>
    </div>
  );
};

export default CommentItem;
