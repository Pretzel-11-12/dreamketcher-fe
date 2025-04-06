'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CoverImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
  rounded?: string;
}

export default function CoverImage({
  alt,
  src,
  height,
  width,
  rounded = 'rounded-[5px]',
}: CoverImageProps) {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  const [url, setURL] = useState<string>('');

  useEffect(() => {
    if (!src.startsWith('https://s3.ap-northeast-2.amazonaws.com/')) {
      setIsImgError(true);
    } else {
      setURL(src);
    }
  }, [src]);

  return (
    <>
      {!url ? (
        <div
          className={`bg-[#DEE5EA] ${rounded}`}
          style={{ height: `${height}px`, width: `${width}px` }}
        ></div>
      ) : (
        <div className={`border border-[#f2f2f2] overflow-hidden ${rounded}`}>
          <img
            alt={alt}
            src={url}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              objectFit: 'cover',
            }}
            className={rounded}
            onError={(e) => {
              setIsImgError(true);
              console.log(e, 'error 에러예욤');
            }}
          />
        </div>
      )}
    </>
  );
}
