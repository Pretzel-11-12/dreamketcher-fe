import { highlightKeyword } from '@/app/util/highlightKeyword';
import { _Model } from '@/app/api/fetchWebtoons/model';
import React from 'react';
import Image from 'next/image';

interface WriterComponentProps {
  writer: _Model.IWriter;
  keyword: string;
}

const WriterComponent: React.FC<WriterComponentProps> = ({
  writer,
  keyword,
}) => {
  return (
    <div className="flex items-center gap-[6px] rounded-md p-[5px] w-full h-[35px] hover:bg-backgroundGray">
      <div className="relative w-[25px] h-[25px] rounded-full overflow-hidden">
        <Image
          src={writer.profileImage || '/images/default-profile.png'}
          alt="프로필 이미지"
          fill
        />
      </div>
      <div className="flex gap-[6px] font-pretendard text-[15px] leading-tight">
        <p className="text-titleBlack">
          {highlightKeyword(writer.authorNickname, keyword)}
        </p>
        {writer.representativeWorkTitle && (
          <p className="text-inActive">
            {highlightKeyword(
              writer.workCount > 1
                ? `<${writer.representativeWorkTitle}> 외 ${
                    writer.workCount - 1
                  }권`
                : `<${writer.representativeWorkTitle}>`,
              keyword
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default WriterComponent;
