export default function BackofficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center mt-[70px] w-full bg-white text-black">
      {children}
    </div>
  );
}
