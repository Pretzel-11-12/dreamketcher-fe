'use client';

interface Props {
  params: Promise<{ params: string }>;
}

export default function Main({ params }: Props) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[1024px]"></div>
      <div className="flex flex-col w-[346px] pt-8 gap-1 ml-2">
        <div className="flex flex-col gap-4"></div>
      </div>
    </div>
  );
}
