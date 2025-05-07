export default function AlarmLayout({
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
