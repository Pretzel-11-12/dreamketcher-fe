'use client';

import { useState } from 'react';

export interface CategoryItemProps {
  id: string;
  label: string;
  subLabel?: string;
  path?: string;
}

interface CategoryTabProps {
  items: CategoryItemProps[];
  selectedId: string;
  handleCategoryClick?: (id: string) => void;
  activeColor?: string;
}

const CategoryTab: React.FC<CategoryTabProps> = ({
  items,
  selectedId,
  handleCategoryClick,
  activeColor: _activeColor,
}) => {
  const [selected, setSelectedId] = useState(selectedId);
  const activeColor = _activeColor || 'brand-yellow';
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-full h-[48px]">
      <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto">
        {items.map((item) => (
          <button
            key={item.id}
            className={`flex items-center justify-center w-[85px] h-[48px] text-[15px] hover:text-${activeColor} hover:border-b border-b-brand-yellow transition duration-300 ${
              selected === item.id
                ? `text-${activeColor} border-b border-b-${activeColor}`
                : 'text-[#888888]'
            }`}
            onClick={() => {
              setSelectedId(item.id);
              handleCategoryClick && handleCategoryClick(item.id);
            }}
          >
            <div className="flex items-center gap-0.5">
              <span>{item.label}</span>
              <span className="font-light">{item.subLabel}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTab;
