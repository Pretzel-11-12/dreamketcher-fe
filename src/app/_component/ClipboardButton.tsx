'use client';

import Image from 'next/image';

interface ClipboardButtonProps {
  textToCopy: string;
}

const ClipboardButton: React.FC<ClipboardButtonProps> = ({ textToCopy }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('텍스트가 클립보드에 복사되었습니다!');
    } catch (error) {
      alert('복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <button onClick={handleCopy} className="">
      <Image
        src="/assets/icon/link.svg"
        alt="link icon"
        width={14}
        height={14}
      />
    </button>
  );
};

export default ClipboardButton;
