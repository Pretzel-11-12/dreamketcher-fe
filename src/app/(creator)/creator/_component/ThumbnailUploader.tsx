'use client';
import React, { useEffect, useRef, useState } from 'react';

interface ThumbnailUploaderProps {
  _preview?: string;
  imageFormat: { width: number; height?: number };
  dpImageFormat?: { width: number };
  onFileSelect: (file: File | null) => void;
}

const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({
  _preview,
  imageFormat,
  dpImageFormat,
  onFileSelect,
}) => {
  const [visibleButton, setVisibleButton] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { width, height } = imageFormat;
  const { width: dpWidth } = dpImageFormat ? dpImageFormat : imageFormat;
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (_preview) setPreview(_preview);
  }, [_preview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      setError('.png, .jpg, .jpeg 파일을 등록해주세요.');
      setPreview(null);
      onFileSelect(null);
      return;
    }
    // 파일 크기
    if (file.size > 1000 * 1024) {
      setError('1MB 미만의 파일을 등록해주세요.');
      setPreview(null);
      onFileSelect(null);
      return;
    }

    // 이미지 크기
    const img = new Image();
    img.onload = () => {
      if (img.width !== width) {
        setError(`가로 ${width} 사이즈 이미지를 등록해주세요.`);
        if (!height) {
          setError(`가로 ${width} 사이즈 이미지를 등록해주세요.`);
        } else {
          img.height !== height &&
            setError(`${width} x ${height} 사이즈 이미지를 등록해주세요.`);
        }

        setPreview(null);
        onFileSelect(null);
        return;
      }

      // 검증 통과
      setError(null);
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    };

    img.src = URL.createObjectURL(file);
  };
  const handleAreaClick = () => {
    imageRef.current?.click();
  };

  return (
    <div className="flex flex-col w-fit h-fit text-xs">
      <div
        className={`flex flex-col items-center justify-center bg-gray-100 rounded-md border text-xs cursor-pointer group relative`}
        onMouseEnter={() => setVisibleButton(true)}
        onMouseLeave={() => setVisibleButton(false)}
        onClick={handleAreaClick}
        style={{ minHeight: '7rem', width: `${dpWidth}px` }}
      >
        <input
          id="file-upload"
          type="file"
          accept=".png, .jpg, .jpeg"
          className="hidden"
          onChange={handleFileChange}
          ref={imageRef}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover border rounded"
          />
        )}
        <div className="absolute inset-0 bg-[#171717] opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded"></div>

        {(!preview || visibleButton) && (
          <div className="absolute bg-white text-gray-500 border px-3 py-2 rounded">
            파일 선택
          </div>
        )}
      </div>

      <p className="text-[#C9C9C9] mt-2">표지파일형식 : *.png, *.jpg, *.jpeg</p>
      <p className="text-[#C9C9C9]">
        파일 크기 :{' '}
        {height ? `${width}(가로)*${height}(세로)` : `${width}(가로)`} / 1MB
        이하
      </p>

      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default ThumbnailUploader;
