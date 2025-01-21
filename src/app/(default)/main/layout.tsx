import CategorySelector from '@/app/(default)/main/_component/CategorySelector';
import GenreSelector from '@/app/(default)/main/_component/GenreSelector';
import QuickMenu from '@/app/(default)/main/_component/QuickMenu';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center mt-[80px] w-full bg-white text-black">
      <QuickMenu />
      <hr className="border-line border-solid" />
      <CategorySelector />
      <hr className="border-line border-solid" />
      <GenreSelector />
      <hr className="border-line border-solid" />
      {children}
    </div>
  );
}
