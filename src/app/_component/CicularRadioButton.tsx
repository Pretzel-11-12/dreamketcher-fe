'use client';
import React, { useState } from 'react';

export interface RadioOption {
  label: string;
  id: string;
}

export interface RadioButtonGroupProps {
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
}

const CicularRadioButton: React.FC<RadioButtonGroupProps> = ({
  options,
  selectedValue = '',
  onChange,
}) => {
  const [selected, setSelected] = useState<string>(selectedValue);

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="grid grid-cols-6 gap-y-3 text-[15px]">
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex items-center gap-2 cursor-pointer`}
        >
          <input
            type="radio"
            name="radio-group"
            value={option.label}
            checked={selected === option.id}
            onChange={() => handleChange(option.id)}
            className="hidden"
          />
          <div className="flex gap-[5px] items-center">
            {selected === option.id ? (
              <div className="w-4 h-4 rounded-full border-[3px] border-brand-yellow bg-brand-yellow flex items-center justify-center">
                <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full border-[3px] border-gray-300 bg-white"></div>
            )}

            <span
              className={`whitespace-nowrap text-[#3F3F3F] ${
                selected === option.id
                  ? 'font-medium text-brand-yellow'
                  : 'font-normal'
              }`}
            >
              {option.label}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default CicularRadioButton;
