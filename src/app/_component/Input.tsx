"use client";

import { useState } from "react";

export interface InputProps {
  text?: string;
  placeholder?: string;
  subText?: string;
  onChange?: (value: string) => void;
  height?: string;
  width?: string;
  active?: boolean;
  containerStyles?: string;
}
const Input: React.FC<InputProps> = (props) => {
  const {
    text,
    placeholder = "텍스트를 입력하세요",
    subText,
    onChange,
    height = "40px",
    width = "100%",
    active = false,
    containerStyles = "",
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative flex flex-col gap-1 text-sm ${containerStyles}`}
      style={{
        height,
        width,
      }}
    >
      <input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`px-4 border rounded-md focus:outline-none transition-colors duration-200 w-full h-full ${
          isFocused || active ? "border-brand-yellow" : "border-brand-gray"
        } ${
          text ? "text-[#3F3F3F]" : "text-[#C9C9C9] placeholder:text-[#C9C9C9]"
        }`}
      />

      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs pointer-events-none">
        {subText}
      </span>
    </div>
  );
};

export default Input;
