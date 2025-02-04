'use client';
import _ from 'lodash';

const QuickMenu = () => {
  const handleClickTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed flex z-50 right-10 top-[63%] transform">
      <div
        className="cursor-pointer rounded-full border bg-white w-[50px] h-[50px] flex items-center justify-center"
        onClick={handleClickTop}
      >
        <span className="mdi mdi-chevron-up text-2xl text-gray-600/50 hover:text-gray-600"></span>
      </div>
    </div>
  );
};

export default QuickMenu;
