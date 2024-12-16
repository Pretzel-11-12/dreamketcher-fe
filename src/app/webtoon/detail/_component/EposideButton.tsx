"use client";
import Image from "next/image";

export interface EpisodeButtonItemInfo {
  text: string;
  subText?: string;
  handleClick: () => void;
  icon: { src: string; size: number; iconWithText?: string };
  isActive?: boolean;
  isLast?: boolean;
}

const EpisodeButton = (props: EpisodeButtonItemInfo) => {
  const { text, subText, handleClick, icon, isActive, isLast } = props;
  return (
    <>
      <div
        onClick={handleClick}
        className={`w-full h-full flex flex-col items-center justify-center ${
          !isLast && "border-r"
        } p-4 hover:bg-slate-300/20`}
      >
        <div className="flex items-center justify-center">
          <Image
            src={icon.src}
            alt={text}
            width={icon.size}
            height={icon.size}
          />
          {icon.iconWithText && (
            <div
              className={`text-sm text-${
                isActive ? "brand-yellow" : "gray-500/90"
              }  pl-1`}
            >
              {icon.iconWithText}
            </div>
          )}
        </div>
        <div className="text-lg font-medium pt-0.5">{text}</div>
        <div className="text-sm text-gray-500/90 -mt-0.5">{subText}</div>
      </div>
    </>
  );
};

export default EpisodeButton;
