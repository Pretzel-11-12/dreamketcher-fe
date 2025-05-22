import React, { useState } from 'react';
import BookShelfAddButton from './BookShelfAddButton';
import BookShelfAddModal from './BookShelfAddModal';
import BookShelfItem from './BookShelfItem';
import { useQuery } from '@tanstack/react-query';
import { getBookShelfFolder } from '@/app/api/fetchFolder';
import { Folder } from '@/app/api/fetchFolder/model';

const BookShelf: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: bookShelves = [], isLoading, isError } = useQuery<Folder[]>({
    queryKey: ['bookShelves'],
    queryFn: getBookShelfFolder,
  });

  const handleAddBookShelf = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <div className="col-span-1">
          <BookShelfAddButton onClick={handleAddBookShelf} />
        </div>
        {/* 첫 번째 줄에 3개의 책장이 배치 */}
        {bookShelves.slice(0, 3).map((shelf, index) => (
          <div key={index} className="col-span-1">
            <BookShelfItem shelf={shelf} />
          </div>
        ))}
      </div>

      {/* 그 이후 줄은 4개씩 배치 */}
      <div className="grid grid-cols-4 gap-2.5">
        {bookShelves.slice(3).map((shelf, index) => (
          <div key={index} className="col-span-1">
            <BookShelfItem shelf={shelf} />
          </div>
        ))}
      </div>

      <BookShelfAddModal isOpen={isModalOpen} onClose={closeModal}/>
    </div>

  );
};

export default BookShelf;
