'use client';
import Image from 'next/image';

export interface EpisodeButtonItemInfo {
  text: string;
  subText?: string;
  handleClick: () => void;
  icon: { src: string; size: number; iconWithText?: string };
  isActive?: boolean;
  isLast?: boolean;
}

const EpisodeButton = (props: EpisodeButtonItemInfo) => {
  const { text, subText, handleClick, icon, isLast } = props;

  const renderIcon = () => {
    if (icon.iconWithText) {
      return (
        <div className="w-[20px] h-[20px] mt-[10px] mb-1 flex items-center justify-center">
          <Image
            src={icon.src}
            alt={text}
            width={icon.size}
            height={icon.size}
          />
          <div className="text-sm text-brand-yellow pl-1">
            {icon.iconWithText}
          </div>
        </div>
      );
    }

    if (subText) {
      return (
        <div className="w-[34px] h-[34px] flex items-center justify-center">
          <Image
            src={icon.src}
            alt={text}
            width={icon.size}
            height={icon.size}
          />
        </div>
      );
    }

    return (
      <div className="w-[34px] h-[34px] flex items-center justify-center mt-3">
        <Image src={icon.src} alt={text} width={icon.size} height={icon.size} />
      </div>
    );
  };

  return (
    <div
      onClick={handleClick}
      className={`w-[144px] h-[100px] flex flex-col items-center ${
        !isLast && 'border-r'
      } p-[10px] hover:bg-slate-300/20`}
    >
      {renderIcon()}
      <div className="text-base/[19px] text-[#3F3F3F] font-medium mt-0.5">
        {text}
      </div>
      {subText && (
        <div className="text-xs/[14px] text-[#888888] mt-0.5">{subText}</div>
      )}
    </div>
  );
};

export default EpisodeButton;
