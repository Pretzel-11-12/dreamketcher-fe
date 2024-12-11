import { ReactNode } from 'react';
import Header from '@/app/_component/Header';
import Footer from '@/app/_component/Footer';

type Props = { children: ReactNode }; // modal 제거

export default function AfterLoginLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
