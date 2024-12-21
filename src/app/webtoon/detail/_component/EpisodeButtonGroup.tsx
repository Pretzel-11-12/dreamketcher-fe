"use client";
import EpisodeButton, { EpisodeButtonItemInfo } from "./EposideButton";

const episodeButtonItems: EpisodeButtonItemInfo[] = [
  {
    text: "좋아요",
    handleClick: () => {},
    icon: { src: "/assets/svg/like.svg", size: 34 },
    subText: "30",
  },
  {
    text: "관심웹툰",
    handleClick: () => {},
    icon: { src: "/assets/svg/add-circle.svg", size: 34 },
    subText: "1,140",
  },
  {
    text: "별점주기",
    handleClick: () => {},
    icon: { src: "/assets/svg/star.svg", size: 15, iconWithText: "4.95" },
    subText: "852명 참여",
  },
  {
    text: "신고하기",
    handleClick: () => {},
    icon: { src: "/assets/svg/report.svg", size: 34 },
  },
  {
    text: "공유하기",
    handleClick: () => {},
    icon: { src: "/assets/svg/export.svg", size: 34 },
  },
];

const EpisodeButtonGroup = () => {
  return (
    <>
      <div className="bg-[#fffff] border rounded-md flex w-full h-[100px] hover:cursor-pointer">
        {episodeButtonItems.map((item, i) => (
          <EpisodeButton
            text={item.text}
            subText={item.subText}
            handleClick={item.handleClick}
            icon={item.icon}
            isActive={item.isActive}
            isLast={i === episodeButtonItems.length - 1}
          />
        ))}
      </div>
    </>
  );
};

export default EpisodeButtonGroup;
