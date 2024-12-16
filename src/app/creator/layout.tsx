export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center w-full bg-white text-black px-[150px]">
      {children}
    </div>
  );
}
