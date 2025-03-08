import Image from 'next/image';

export interface UserInfo {
  name: string;
  story: string;
  authorImage: string;
}
export default function WriterInfoItem({ name, story, authorImage }: UserInfo) {
  const src = authorImage || '/assets/images/profile-default.png';

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        <Image
          src={src}
          alt={name}
          width={30}
          height={30}
          className="cursor-pointer rounded-full w-[30px] h-[30px]"
        />
        <div className="flex gap-1 items-center">
          <div className="text-[13px] text-[#3F3F3F]">{name}</div>
          <div className="text-[13px] text-[#888888]">글 / 그림</div>
        </div>
      </div>
      <div className="text-[15px]/[18px] text-[#3F3F3F] pt-[10px]">{story}</div>
    </div>
  );
}
