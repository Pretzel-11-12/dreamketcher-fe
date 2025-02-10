'use client';
import React, { ChangeEvent, useState } from 'react';

export interface TextareaProps {
  text?: string;
  placeholder?: string;
  subText?: string;
  height?: string;
  width?: string;
  active?: boolean;
  onChange?: (value: string) => void;
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const {
    text = '',
    placeholder = '텍스트를 입력하세요',
    subText = '',
    height = '200px',
    width = '100%',
    active = false,
    maxLength,
    onChange,
  } = props;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (onChange) onChange(value);
  };

  const handleOnInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;

    if (maxLength && value.length > maxLength) {
      (e.currentTarget as HTMLTextAreaElement).value = value.slice(
        0,
        maxLength
      );
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex flex-col w-full text-sm px-4 py-3 border rounded-md bg-white focus:outline-none transition-colors duration-200 ${
        isFocused || active ? 'border-brand-yellow' : 'border-brand-gray'
      } ${text ? 'text-[#3F3F3F]' : 'text-[#C9C9C9] placeholder:text-[#C9C9C9]'}
      
`}
      style={{
        height,
        width,
        color: text ? '#3F3F3F' : undefined,
      }}
    >
      <textarea
        value={text}
        onInput={(e) => maxLength && handleOnInput(e)}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`outline-none flex-1 resize-none`}
      ></textarea>

      <div className="text-xs pointer-events-none w-full flex justify-end">
        <span>{subText}</span>
      </div>
    </div>
  );
};

export default Textarea;
