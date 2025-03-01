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

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mx-auto w-full h-[40px]">
      <div className="flex flex-wrap items-center justify-center md:mb-0 w-full md:w-auto h-full">
        {items.map((item) => (
          <button
            key={item.id}
            className={`flex items-center justify-center w-[85px] h-full text-[15px] border-b-brand-yellow transition duration-300 ${
              selected === item.id
                ? 'text-brand-yellow border-b border-b-brand-yellow font-medium'
                : 'text-[#888888]'
            }`}
            onClick={() => {
              setSelectedId(item.id);
              handleCategoryClick && handleCategoryClick(item.id);
            }}
          >
            <div className="flex items-center gap-0.5 text-[13px]">
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
