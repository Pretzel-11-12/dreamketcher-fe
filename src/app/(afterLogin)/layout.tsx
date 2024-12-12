import { ReactNode } from 'react';

type Props = { children: ReactNode }; // modal 제거

export default function AfterLoginLayout({ children }: Props) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
