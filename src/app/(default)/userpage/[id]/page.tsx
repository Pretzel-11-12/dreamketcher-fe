'use client';

import ProfileWork from '@/app/(default)/userpage/[id]/_component/ProfileWork';
import ProfileInfo from '@/app/(default)/userpage/[id]/_component/ProfileInfo';
import { useParams } from 'next/navigation';

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
