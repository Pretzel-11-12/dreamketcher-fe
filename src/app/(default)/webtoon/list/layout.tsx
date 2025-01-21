import { ReactNode, useEffect, useState } from 'react';
import QuickMenu from '@/app/(default)/main/_component/QuickMenu';

type Props = { children: ReactNode };

export default function DetailLayout({ children }: Props) {
  return (
    <>
      <div className="">
        <QuickMenu />
        <div className="w-full flex flex-col items-center bg-white text-black">
          {children}
        </div>
      </div>
    </>
  );
}
