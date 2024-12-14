import { ReactNode, useEffect, useState } from "react";
import EpisodeHeader from "./_component/EpisodeHeader";
import EpisodeFooter from "./_component/EpisodeFooter";
import QuickMenu from "./_component/QuickMenu";

type Props = { children: ReactNode };

export default function DetailLayout({ children }: Props) {
  return (
    <>
      <div className="pt-[80px] pb-10">
        <EpisodeHeader />
        <QuickMenu />

        <div className="pt-[100px] w-full flex flex-col items-center">
          {children}
        </div>

        <EpisodeFooter />
      </div>
    </>
  );
}
