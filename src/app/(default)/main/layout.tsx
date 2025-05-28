import CategorySelector from '@/app/(default)/main/_component/CategorySelector';
import GenreSelector from '@/app/(default)/main/_component/GenreSelector';
import QuickMenu from '@/app/_component/QuickMenu';
import SideSection from './_component/SideSection';
import { announcements } from '@/app/mocks/SideData';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center mt-[70px] w-full bg-white text-black">
      <QuickMenu />
      <CategorySelector />
      <GenreSelector />
      <div className="w-full flex justify-center">
        <div className="flex w-[1200px]">
          {children}
          <SideSection announcements={announcements} />
        </div>
      </div>
    </div>
  );
}
