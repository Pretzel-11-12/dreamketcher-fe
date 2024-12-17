import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface DropdownProps {
  options: { label: string; value: string }[]; // 옵션 데이터 타입
  defaultOption?: string; // 초기 선택 옵션
}

const Dropdown: React.FC<DropdownProps> = ({ options, defaultOption }) => {
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
    <div className='relative inline-block text-left w-32' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-between w-[104px] h-[37px] px-4 py-2 text-sm font-medium text-gray-700
          ${isOpen ? 'rounded-t-md' : 'rounded-md'}
          border border-[#F2F2F2] shadow-sm bg-white
          hover:bg-[#E4EBFF] focus:outline-none`}
      >
        {selected
          ? options.find((option) => option.value === selected)?.label
          : 'Select'}
        <span className='ml-2 mt-[4px]'>
          {isOpen ? (
            <Image
              src='/assets/icon/upArrow.svg'
              alt='Up Arrow'
              width={13}
              height={13}
            />
          ) : (
            <Image
              src='/assets/icon/downArrow.svg'
              alt='Down Arrow'
              width={13}
              height={13}
            />
          )}
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className='absolute z-10 w-[104px] bg-white border border-[#F2F2F2] rounded-b-md shadow-lg'>
          <div className='py-0 '>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex justify-between cursor-pointer px-4 py-2 text-sm text-gray-700
                  hover:bg-[#E4EBFF] w-[104px] h-[37px]`}
              >
                <span>{option.label}</span>
                {selected === option.value && (
                  <Image
                    src='/assets/icon/check.svg'
                    alt='check icon'
                    width={13}
                    height={13}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
