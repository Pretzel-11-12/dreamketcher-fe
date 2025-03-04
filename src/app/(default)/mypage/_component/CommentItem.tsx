import Image from 'next/image';
import React from 'react';

interface CommentItemProps {
  id: number;
  profileImage: string;
  nickname: string;
  content: string;
  webtoon: {
    thumbnail: string;
    title: string;
  };
  createdAt: string;
  likes: number;
  dislikes: number;
  replies: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  profileImage,
  nickname,
  content,
  webtoon,
  createdAt,
  likes,
  dislikes,
  replies,
}) => {
  return (
    <div className="border-b py-4">
      <div className="flex items-start gap-4">
        <img
          src={profileImage}
          alt={nickname}
          className="w-9 h-9 object-cover rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-titleBlack">{nickname}</span>
            <span className="text-xs text-[#888888]">{createdAt}</span>
          </div>
          <p className="text-[13px] text-[#3F3F3F] mt-1">{content}</p>
          <div className="flex gap-2 mt-4">
            <div className="bg-[#DEE5EA] h-[60px] w-[70px] h-[42px] rounded-md" />
            <span className="text-[13px] text-gray-600">{webtoon.title}</span>
          </div>
          <div className="flex items-center text-xs gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Image
                src={'/assets/icon/inactiveMessage.svg'}
                alt="Message Icon"
                width={11}
                height={11}
              />
              <span>{replies}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={'/assets/icon/inactiveLike.svg'}
                alt="Like Icon"
                width={11}
                height={11}
              />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={'/assets/icon/inactiveDislike.svg'}
                alt="Dislike Icon"
                width={11}
                height={11}
              />
              <span>{dislikes}</span>
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
