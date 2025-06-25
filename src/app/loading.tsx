import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#17171C]/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        {/* 로딩 스피너 애니메이션 */}
        <div className="relative w-16 h-16">
          <div className="absolute w-16 h-16 border-4 border-brand-primary/30 rounded-full" />
          <div className="absolute w-16 h-16 border-4 border-transparent border-t-brand-primary rounded-full animate-spin" />
        </div>

        {/* 로고 이미지 (있다고 가정) */}
        {/* <div className="relative w-24 h-8">
          <Image
            src="/assets/logo/logo.svg"
            alt="Loading logo"
            fill
            className="object-contain opacity-80"
          />
        </div> */}

        {/* 로딩 텍스트 */}
        <p className="text-white/80 text-sm font-medium animate-pulse">
          콘텐츠를 불러오는 중입니다...
        </p>
      </div>
    </div>
  );
}
