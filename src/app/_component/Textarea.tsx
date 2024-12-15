"use client";
import React, { useState } from "react";

export interface TextareaProps {
  text?: string;
  placeholder?: string;
  subText?: string;
  height?: string;
  width?: string;
  active?: boolean;
  onChange?: (value: string) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  text = "",
  placeholder = "텍스트를 입력하세요",
  subText = "",
  height = "200px",
  width = "100%",
  active = false,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex flex-col gap-1 text-sm text-[#C9C9C9]">
      <textarea
        value={text}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`px-4 py-3 border rounded-md focus:outline-none transition-colors duration-200 ${
          isFocused || active ? "border-brand-yellow" : "border-brand-gray"
        }`}
        style={{
          height,
          width,
        }}
      />

      <span className="absolute bottom-1 right-2 text-xs pointer-events-none">
        {subText}
      </span>
    </div>
  );
};

export default Textarea;
