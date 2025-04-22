import Image from 'next/image';

export default function EventViewer() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-[3px] h-5 items-center">
        <p className="text-[18px] font-medium text-titleBlack leading-[20px]">
          이벤트 보러가기
        </p>
        <div className="relative w-5 h-5">
          <Image
            src="/assets/icon/firecracker.png"
            alt="Site promotion image"
            fill
          />
        </div>
      </div>
      <div className="flex gap-[10px]">
        <Image
          src="/assets/images/promotion-4.png"
          alt="Site promotion image"
          width={430}
          height={90}
        />
        <Image
          src="/assets/images/promotion-3.png"
          alt="Site promotion image"
          width={430}
          height={90}
          layout="intrinsic"
        />
      </div>
    </div>
  );
}
