/**
 * 마이페이지의 기본 레이아웃을 렌더링합니다.
 *
 * @param children - 레이아웃 내에 표시할 React 노드입니다.
 */
export default function MypageLayout({
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
