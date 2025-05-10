export default function BookShelfLayout({
children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="flex w-[1200px]">
        <main className="flex-1 border-r border-r-line bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
