'use client';
import { useState } from 'react';

export interface OptionButtonInfo {
  items: { text: string; onClick: () => void }[];
}
const OptionButton: React.FC<OptionButtonInfo> = ({ items }) => {
  const [activeOption, setOption] = useState(false);

  return (
    <div className="relative w-fit">
      <button
        onClick={() => setOption(!activeOption)}
        className="hover:bg-brand-gray rounded-md px-2 py-1.5"
      >
        <span className="mdi mdi-dots-horizontal"></span>
      </button>
      {activeOption && (
        <div className="absolute right-0 top-9 z-30 w-[100px] h-fit flex flex-col rounded-md border-gray-400/20 border px-1 bg-white">
          {items.map((item, index) => (
            <div
              className={`${
                index !== items.length - 1 && `border-b`
              } border-gray-400/20 w-full py-[3px]`}
            >
              <button
                className="hover:bg-brand-gray rounded-sm px-2 py-[5px] text-sm flex w-full"
                onClick={() => {
                  item.onClick(), setOption(false);
                }}
              >
                {item.text}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionButton;
