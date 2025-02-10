import CategorySelector from '@/app/(default)/main/_component/CategorySelector';
import GenreSelector from '@/app/(default)/main/_component/GenreSelector';

export default function BackofficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center mt-[70px] w-full bg-white text-black">
      {children}
    </div>
  );
}
