import Link from 'next/link';

const MypageHeader = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '100px',
        backgroundColor: '#f5f5f5',
        gap: '20px',
      }}
    >
      <Link href='/mypage'>내 정보</Link>
      <Link href='/mypage/info'>정보 변경</Link>
      <Link href='/mypage/favorites'>관심 웹툰</Link>
      <Link href='/mypage/recent'>방금 본 웹툰</Link>
    </header>
  );
};

export default MypageHeader;
