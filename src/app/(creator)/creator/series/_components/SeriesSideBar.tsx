'use client';

import useAuthStore from '@/app/store/authStore';

const SeriesSideBar: React.FC<{}> = () => {
  const { nickname, businessEmail, imageUrl, shortIntroduction } =
    useAuthStore();

  return (
    <div className="flex flex-col gap-2 w-[220px] border-r h-full items-center min-h-[1200px] pt-4">
      <img
        className="w-[100px] h-[100px] rounded-full border border-[#F2F2F2]"
        src={imageUrl || '/assets/images/profile-default.png'}
        alt="프로필"
      />
      <p className="text-[18px] font-medium text-gray-800 mt-[8px]">
        {nickname}
      </p>
    </div>
  );
};

export default SeriesSideBar;
