import { redirect } from 'next/navigation';

export default function MainPage() {
  // 기본 장르로 리다이렉트
  redirect('/main/default'); // 기본 장르를 설정 (예: "romance")
  return null; // 리다이렉트된 후 렌더링할 내용 없음
}
