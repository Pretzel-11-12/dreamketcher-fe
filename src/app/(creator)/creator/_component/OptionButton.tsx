'use client';
import Image from 'next/image';
import { useState } from 'react';

export interface OptionButtonInfo {
  items: { text: string; onClick: () => void }[];
}
const OptionButton: React.FC<OptionButtonInfo> = ({ items }) => {
  const [activeOption, setOption] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOption(!activeOption)}
        className="hover:bg-brand-gray rounded-md w-[20px] h-[20px]"
      >
        <Image
          src="/assets/icon/menu.png"
          alt="option"
          width={20}
          height={20}
        />
      </button>
      {activeOption && (
        <div
          className="absolute right-0 top-9 z-30 w-[110px] h-fit flex flex-col rounded-[10px] border-gray-400/20 border p-[4px] bg-white"
          style={{ boxShadow: '0px 0px 4px 0px rgba(164, 164, 164, 0.12)' }}
        >
          {items.map((item) => (
            <button
              key={item.text}
              className="hover:bg-brand-gray rounded-[6px] p-[5px] text-[13px] flex w-full text-[#3F3F3F]"
              onClick={() => {
                item.onClick(), setOption(false);
              }}
            >
              {item.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionButton;
