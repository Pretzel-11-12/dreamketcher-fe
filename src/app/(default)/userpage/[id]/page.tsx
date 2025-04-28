'use client';

import ProfileWork from '@/app/(default)/userpage/[id]/_component/ProfileWork';
import ProfileInfo from '@/app/(default)/userpage/[id]/_component/ProfileInfo';
import { useParams } from 'next/navigation';

/**
 * URL의 동적 파라미터에서 사용자 ID를 추출하여 해당 사용자의 프로필 정보와 작업 내역을 표시하는 페이지 컴포넌트입니다.
 *
 * @returns 사용자 프로필 정보와 작업 내역을 포함하는 JSX 요소를 반환합니다.
 */
export default function ProfilePage() {

  const { id } = useParams();
  const userId = Number(id);

  return (
    <div className="min-h-screen flex flex-col pl-[24px] border-x">
      <ProfileInfo userId={userId}/>
      <ProfileWork userId={userId}/>
    </div>
  );
}
