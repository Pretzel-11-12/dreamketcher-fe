"use client";
import React, { useState } from "react";

export interface RadioOption {
  label: string;
  id: string;
}

export interface RadioButtonGroupProps {
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonGroupProps> = ({
  options,
  selectedValue = "",
  onChange,
}) => {
  const [selected, setSelected] = useState<string>(selectedValue);

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
      {options.map((option) => (
        <label key={option.id} className={`flex items-center gap-2`}>
          <input
            type="checkbox"
            name="radio-group"
            value={option.label}
            checked={selected === option.id}
            onChange={() => handleChange(option.id)}
            className="hidden"
          />
          <div className="flex gap-2 items-center">
            {selected === option.id ? (
              <span className="mdi mdi-check-circle text-brand-yellow text-xl" />
            ) : (
              <span className="mdi mdi-check-circle-outline text-gray-500/30 text-xl" />
            )}

            <span
              className={`whitespace-nowrap ${
                selected === option.id && "font-semibold"
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

export default RadioButton;
