'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SliderDropdownProps {
  options: { label: string; value: string }[]; // 옵션 데이터 타입
  defaultOption?: string; // 초기 선택 옵션
}

const SliderDropdown: React.FC<SliderDropdownProps> = ({
  options,
  defaultOption,
}) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
  const [selected, setSelected] = useState<string | null>(
    defaultOption || null
  ); // 선택된 옵션
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  // 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex text-left w-32" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`inline-flex gap-2 items-center w-[57px] h-[17px] text-[14px] leading-[14px] text-[#888888]`}
      >
        {selected
          ? options.find((option) => option.value === selected)?.label
          : 'Select'}
        <span className="">
          {isOpen ? (
            <Image
              src="/assets/icon/mainPage-upArrow.svg"
              alt="Up Arrow"
              width={11}
              height={11}
            />
          ) : (
            <Image
              src="/assets/icon/mainPage-downArrow.svg"
              alt="Down Arrow"
              width={11}
              height={11}
            />
          )}
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute z-10 w-[83px] mt-[24px] bg-white border border-baseLine rounded-[5px] shadow-lg">
          <div className="">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex justify-between cursor-pointer px-[10px] py-[7px] text-[13px] leading-[16px] ${
                  selected === option.value
                    ? 'text-contentBlack'
                    : 'text-lightGray'
                }
                  hover:bg-[#E4EBFF] w-[83px] h-[30px]`}
              >
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderDropdown;
