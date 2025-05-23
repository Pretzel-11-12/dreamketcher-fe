import { ReactNode } from 'react';
import QuickMenu from '@/app/_component/QuickMenu';

type Props = { children: ReactNode };

export default function DetailLayout({ children }: Props) {
  return (
    <>
      <div className="pt-[70px] pb-10">
        <QuickMenu />

        <div className="w-full flex flex-col items-center bg-white text-black">
          {children}
        </div>
      </div>
    </>
  );
}
