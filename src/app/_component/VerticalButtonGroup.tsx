'use client';
import React, { useState } from 'react';

export interface ButtonOption {
  label: string;
  id: string;
}

export interface VerticalButtonGroupProps {
  options: ButtonOption[];
  selectedValue?: 'ongoing' | 'completed';
  onChange?: (value: 'ongoing' | 'completed') => void;
}

const VerticalButtonGroup: React.FC<VerticalButtonGroupProps> = ({
  options,
  selectedValue = 'ongoing',
  onChange,
}) => {
  const [selected, setSelected] = useState<'ongoing' | 'completed'>(
    selectedValue
  );

  const handleChange = (value: 'ongoing' | 'completed') => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="flex flex-col gap-3 text-[15px]">
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex items-center gap-2 cursor-pointer`}
        >
          <input
            type="radio"
            name="vertical-radio-group"
            value={option.label}
            checked={selected === option.id}
            onChange={() => handleChange(option.id as 'ongoing' | 'completed')}
            className="hidden"
          />
          <div className="flex gap-[10px] items-center">
            {selected === option.id ? (
              <div className="w-4 h-4 rounded-full border-[3px] border-brand-yellow bg-brand-yellow flex items-center justify-center">
                <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full border-[1px] border-gray-300 bg-white"></div>
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

export default VerticalButtonGroup;
