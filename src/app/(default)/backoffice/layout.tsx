import ReportSelector from '@/app/(default)/backoffice/_component/ReportSelector';

export default function BackofficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center mt-[70px] w-full bg-white text-black">
      <ReportSelector />
      <div className="w-full flex justify-center">
        <div className="flex w-[1200px]">{children}</div>
      </div>
    </div>
  );
}
