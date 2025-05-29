import Image from 'next/image';

const BookShelfAddButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center w-[210px] h-[165px] rounded-[10px] bg-bgGray gap-[5px] outline-[1px] outline-dashed outline-[#E0E0E0] outline-offset-[-1px]"
    >
      <Image
        src={'/assets/icon/add-circle-gray.svg'}
        alt={'추가 아이콘'}
        width={25}
        height={25}
      />
      <p className={'text-[#888888] text-base font-medium'}>책장 추가하기</p>
    </button>
  );
};

export default BookShelfAddButton;
