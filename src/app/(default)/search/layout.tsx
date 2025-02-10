import CategorySelector from '@/app/(default)/main/_component/CategorySelector';
import GenreSelector from '@/app/(default)/main/_component/GenreSelector';

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center mt-[70px] w-full bg-white text-black">
      <hr className="border-line border-solid" />
      <CategorySelector />
      <hr className="border-line border-solid" />
      {children}
    </div>
  );
}
