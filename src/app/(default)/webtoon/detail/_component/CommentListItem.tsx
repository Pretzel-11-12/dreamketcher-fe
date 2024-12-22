export interface CommentInfo {
  id: number;
  name: string;
  description: string;
  timestamp: number;
  like: number;
}
export default function CommentListItem({
  id,
  name,
  description,
  timestamp,
  like,
}: CommentInfo) {
  const time = new Date(timestamp).toISOString().split('T')[0];
  return (
    <div className="grid grid-cols-[auto_1fr] py-4 gap-2 border-b">
      <span className="mdi mdi-account-circle text-gray-600/50 text-[40px] -mt-3"></span>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div className="text-sm">{name}</div>
          <div className="text-sm">{time}</div>
        </div>

        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
}
