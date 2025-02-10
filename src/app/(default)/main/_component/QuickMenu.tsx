'use client';
import _ from 'lodash';
import Image from 'next/image';
const QuickMenu = () => {
  const handleClickTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed flex z-50 right-[30px] top-[625px]">
      <div
        className="cursor-pointer rounded-full shadow-[0_0_4px_0px_rgba(0,0,0,0.25)] bg-white w-[50px] h-[50px] flex items-center justify-center"
        onClick={handleClickTop}
      >
        <Image
          src={'/assets/icon/arrow-up.svg'}
          alt={'위로 이동 이미지'}
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default QuickMenu;
