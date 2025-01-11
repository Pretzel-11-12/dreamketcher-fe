'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export default function DefaultImage({ alt, src, height, width }: ImageProps) {
  const [isImgError, setIsImgError] = useState<boolean>(false);

  return (
    <>
      {isImgError ? (
        <div className={`bg-[#DEE5EA] h-[${height}px] w-[${width}px]`}></div>
      ) : (
        <Image
          alt={alt}
          src={src}
          width={width}
          height={height}
          onError={(e) => {
            setIsImgError(true);
            console.log(e, 'error 에러예욤');
          }}
        />
      )}
    </>
  );
}
