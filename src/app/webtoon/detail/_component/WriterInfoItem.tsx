export interface UserInfo {
  name: string;
  description: string;
}
export default function WriterInfoItem({ name, description }: UserInfo) {
  return (
    <div className="flex flex-col py-4 gap-1 border-b">
      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        <span className="mdi mdi-account-circle text-gray-600/50 text-4xl -ml-1"></span>
        <div className="flex gap-1 items-center">
          <div className="text-sm">{name}</div>
          <div className="text-gray-400 text-sm">글 / 그림</div>
        </div>
      </div>
      <div className="text-sm">{description}</div>
    </div>
  );
}
