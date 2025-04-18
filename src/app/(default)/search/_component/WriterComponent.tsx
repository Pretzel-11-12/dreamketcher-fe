import { highlightKeyword } from '@/app/util/highlightKeyword';
import React from 'react';

interface Writer {
  name: string;
  profileImage: string;
  authorNickname: string;
  representativeWorkTitle: string;
  workCount: number;
}

interface WriterComponentProps {
  writer: Writer;
  keyword: string;
}

const WriterComponent: React.FC<WriterComponentProps> = ({
  writer,
  keyword,
}) => {
  return (
    <div className="flex items-center gap-[6px] rounded-md p-[5px] w-full h-[35px] hover:bg-backgroundGray">
      <img
        src={writer.profileImage}
        alt="프로필 이미지"
        className="rounded-full w-[25px] h-[25px]"
      />
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
