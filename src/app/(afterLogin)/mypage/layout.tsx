import MypageHeader from '../../_component/MypageHeader';

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MypageHeader />
      <main>{children}</main>
    </div>
  );
}
