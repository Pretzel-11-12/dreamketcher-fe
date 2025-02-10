'use client';

import { ChangeEvent, useState } from 'react';

export interface InputProps {
  text?: string;
  placeholder?: string;
  subText?: string;
  onChange?: (value: string) => void;
  height?: string;
  width?: string;
  active?: boolean;
  containerStyles?: string;
  disable?: boolean;
  maxLength?: number;
}
const Input: React.FC<InputProps> = (props) => {
  const {
    text,
    placeholder = '텍스트를 입력하세요',
    subText,
    onChange,
    height = '40px',
    width = '100%',
    active = false,
    containerStyles = '',
    disable = false,
    maxLength,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    if (maxLength && value.length > maxLength) {
      (e.currentTarget as HTMLInputElement).value = value.slice(0, maxLength);
    }
  };

  return (
    <div
      className={`flex items-center w-full gap-1 text-sm ${containerStyles} px-4 border rounded-md bg-white focus:outline-none transition-colors duration-200 w-full h-full ${
        isFocused || active ? 'border-brand-yellow' : 'border-brand-gray'
      } ${text ? 'text-[#3F3F3F]' : 'text-[#C9C9C9] placeholder:text-[#C9C9C9]'}
`}
      style={{
        height,
        width,
      }}
    >
      <input
        className="outline-none flex-1"
        onInput={(e) => maxLength && handleOnInput(e)}
        type="text"
        value={text}
        placeholder={placeholder}
        disabled={disable}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <span className="text-xs pointer-events-none">{subText}</span>
    </div>
  );
};

export default Input;
