import React, { useState } from 'react';
import BookShelfAddButton from './BookShelfAddButton';
import BookShelfAddModal from './BookShelfAddModal';
import BookShelfItem from './BookShelfItem';
import { useQuery } from '@tanstack/react-query';
import { getBookShelfFolder } from '@/app/api/fetchFolder';
import { Folder } from '@/app/api/fetchFolder/model';
import Pagination from '@/app/_component/Pagination';

const BookShelf: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  const { data, isLoading, isError } = useQuery<{ folders: Folder[], total: number }>({
    queryKey: ['bookShelves'],
    queryFn: getBookShelfFolder,
  });

  const bookShelves = data?.folders || [];
  const total = data?.total || 0;

  const totalPages = Math.ceil(bookShelves.length / itemsPerPage);

  const currentBookShelves = bookShelves.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddBookShelf = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <div className="col-span-1">
          <BookShelfAddButton onClick={handleAddBookShelf} />
        </div>
        {/* 첫 번째 줄에 3개의 책장이 배치 */}
        {currentBookShelves.slice(0, 3).map((shelf, index) => (
          <div key={index} className="col-span-1">
            <BookShelfItem shelf={shelf} />
          </div>
        ))}
      </div>

      {/* 그 이후 줄은 4개씩 배치 */}
      <div className="grid grid-cols-4 gap-2.5">
        {currentBookShelves.slice(3).map((shelf, index) => (
          <div key={index} className="col-span-1">
            <BookShelfItem shelf={shelf} />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <BookShelfAddModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default BookShelf;
