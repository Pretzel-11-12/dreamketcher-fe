'use client';

import Image from 'next/image';
import ClipboardButton from '@/app/_component/ClipboardButton';

const dummyUsers = [
  {
    id: 1,
    nickname: '지나가는 나그네',
    imageUrl: '/assets/images/profile-default.png',
    businessEmail: 'dreamketcher@example.com',
    shortIntroduction: '나그네의 계정입니다.',
  },
  {
    id: 2,
    nickname: '웹툰덕후99',
    imageUrl: '/assets/images/profile-default.png',
    businessEmail: 'webtoonlover99@example.com',
    shortIntroduction: '웹툰 없이는 못 사는 사람입니다.',
  },
  {
    id: 3,
    nickname: '밤하늘별빛',
    imageUrl: '/assets/images/profile-default.png',
    businessEmail: 'starlight@example.com',
    shortIntroduction: '별을 좋아하는 감성러입니다',
  },
];

interface ProfileInfoProps {
  userId: number;
}

const ProfileInfo = ({ userId }: ProfileInfoProps) => {
  const user = dummyUsers.find((u) => u.id === userId);

  if (!user) {
    return <p className="text-red-500 mt-10">존재하지 않는 사용자입니다.</p>;
  }

  const emailText = user.businessEmail || '지정된 이메일이 없습니다.';

  return (
    <>
      <div className="max-w-4xl bg-white mt-[105px] flex">
        <Image
          src={user.imageUrl || '/assets/images/profile-default.png'}
          alt="프로필 이미지"
          width={70}
          height={70}
          className="w-[70px] h-[70px] rounded-full object-cover mr-[15px] border border-[#F2F2F2]"
        />
        <div>
          <p className="text-[18px] font-medium text-titleBlack mt-3">
            {user.nickname}
          </p>

          <div className="flex">
            <Image
              src={'/assets/images/mail.svg'}
              alt="Mail Icon"
              width={11}
              height={9}
            />
            <p className="text-[12px] text-[#888888] m-1">{user.businessEmail}</p>
            <ClipboardButton textToCopy={emailText} />
          </div>
        </div>
      </div>

      <p className="text-sm text-contentBlack mt-[19px]">{user.shortIntroduction}</p>
    </>
  );
};

export default ProfileInfo;
