import Image from 'next/image';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-[3px]">
      <button
        className="disabled:opacity-50"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <Image
          src={'/assets/icon/leftArrow.svg'}
          alt="leftArrow Icon"
          width={20}
          height={20}
          className=""
        />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`w-[24px] h-[24px] text-[13px] ${
            currentPage === index + 1
              ? 'bg-[#2E4072] rounded-[5px] text-white'
              : ''
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="disabled:opacity-50"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <Image
          src={'/assets/icon/rightArrow.svg'}
          alt="rightArrow Icon"
          width={20}
          height={20}
          className=""
        />
      </button>
    </div>
  );
};

export default Pagination;
