import MypageHeader from './_component/MypageHeader';

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="flex w-[1200px]">
        <MypageHeader />
        <main className="flex-1 pl-6 pr-[23px] border-r border-r-line bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
