import type { Metadata } from 'next';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
