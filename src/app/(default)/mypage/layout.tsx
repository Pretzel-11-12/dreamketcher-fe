import MypageHeader from './_component/MypageHeader';

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex w-[1024px]">
        <MypageHeader />
        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
