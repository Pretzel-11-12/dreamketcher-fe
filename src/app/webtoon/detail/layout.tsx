import { ReactNode, useEffect, useState } from "react";

type Props = { children: ReactNode };

export default function DetailLayout({ children }: Props) {
  return (
    <div className="pt-[100px] pb-10 w-full flex flex-col items-center">
      {children}
    </div>
  );
}
