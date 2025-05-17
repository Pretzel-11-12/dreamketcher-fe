import React, { useState } from 'react';
import BookShelfAddButton from './BookShelfAddButton';
import BookShelfAddModal from './BookShelfAddModal';
import BookShelfItem from './BookShelfItem';

const BookShelf: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookShelves, setBookShelves] = useState<any[]>([]);

  const handleAddBookShelf = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addBookShelf = (folderName: string, isPrivate: boolean) => {
    const newShelf = {
      folderName,
      isPrivate,
      webtoons: [{ thumbnail: '/assets/images/event-webtoon-thumbnail-1.jpg', title: 'Webtoon 1' }, { thumbnail: '/assets/images/event-webtoon-thumbnail-2.jpg', title: 'Webtoon 2' }, { thumbnail: '/assets/images/event-webtoon-thumbnail-3.jpg', title: 'Webtoon 3' }]
    };
    setBookShelves([...bookShelves, newShelf]);
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

      <BookShelfAddModal isOpen={isModalOpen} onClose={closeModal} onAddShelf={addBookShelf} />
    </div>

  );
};

export default BookShelf;
