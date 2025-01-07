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
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        className="px-2 py-1 disabled:opacity-50"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <Image
          src={'/assets/icon/leftArrow.svg'}
          alt="leftArrow Icon"
          width={18}
          height={18}
          className=""
        />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`px-3 py-1  ${
            currentPage === index + 1
              ? 'bg-[#2E4072] rounded-md text-white text-[13px]'
              : ''
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-2 py-1 disabled:opacity-50"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <Image
          src={'/assets/icon/rightArrow.svg'}
          alt="rightArrow Icon"
          width={18}
          height={18}
          className=""
        />
      </button>
    </div>
  );
};

export default Pagination;
