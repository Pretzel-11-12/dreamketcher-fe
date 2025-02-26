import Button from '@/app/_component/Button';
import Link from 'next/link';

export interface NoticeInfo {
  index: number;
  title: string;
}
export default function NoticeListItem({ index, title }: NoticeInfo) {
  return (
    <div className="grid grid-cols-[auto_1fr] border-b gap-4 p-[15px] pl-0">
      <div className="flex gap-3 items-center text-sm">
        <div className="px-[10px] py-0.5 text-[12px] border border-brand-blue text-brand-blue rounded-md">
          공지
        </div>
        <div className="text-[15px] text-titleblack">{title}</div>
      </div>
    </div>
  );
}
