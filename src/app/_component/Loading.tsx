'use client';

import Image from 'next/image';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="/assets/icon/Loading.gif"
        alt="로딩 중"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Loading;
