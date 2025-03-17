import Image from 'next/image';

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* 로딩 스피너 애니메이션 */}
        <div className="relative w-[32px] h-[32px]">
          <div className="w-8 h-8 invisible" />
          <div className="absolute top-0 left-0 w-8 h-8 border-4 border-brand-primary/30 rounded-full" />
          <div className="absolute top-0 left-0 w-8 h-8 border-4 border-transparent border-t-brand-primary rounded-full animate-spin" />
        </div>

        {/* 로고 */}
        <div className="relative w-[32px] h-[32px]">
          <Image
            src="/assets/images/d-studio-logo.png"
            alt="Loading logo"
            width={32}
            height={32}
            className="object-contain opacity-80"
          />
        </div>

        {/* 로딩 텍스트 */}
        <p className="text-white/80 text-sm font-medium animate-pulse">
          Dreakethcer 페이지 불러오는 중...
        </p>
      </div>
    </div>
  );
}
