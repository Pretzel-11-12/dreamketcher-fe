'use client';

import useAuthStore from '@/app/store/authStore';

const SeriesSideBar: React.FC<{}> = () => {
  const { nickname, businessEmail, imageUrl, shortIntroduction } =
    useAuthStore();

  return (
    <div className="flex flex-col gap-[20px] w-[220px] border-r h-full items-center min-h-[1200px] pt-4 border-[#F2F2F2]">
      <img
        className="w-[90px] h-[90px] rounded-full border border-[#F2F2F2]"
        src={imageUrl || '/assets/images/profile-default.png'}
        alt="프로필"
      />
      <p className="text-[16px] font-normal text-gray-800">{nickname}</p>
    </div>
  );
};

export default SeriesSideBar;
