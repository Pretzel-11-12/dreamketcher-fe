import Button from "@/app/_component/Button";

export interface CommentInfo {
  id: string;
  name: string;
  description: string;
  timestamp: number;
  like: number;
}
export default function Comment({
  id,
  name,
  description,
  timestamp,
  like,
}: CommentInfo) {
  const time = new Date(timestamp).toLocaleString();
  return (
    <div className="flex flex-col p-3 border rounded-md gap-1">
      <div className="flex w-full gap-2">
        <span className="mdi mdi-account-circle text-gray-500/70 text-5xl"></span>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex w-full justify-between">
            <div className="font-bold">{name}</div>
            <div>{time}</div>
          </div>
          <div className="font-thin">{description}</div>
        </div>
      </div>

      <Button size="S" variant="bg-transparent">
        <div className="flex gap-0.5">
          <span className="mdi mdi-thumb-up-outline text-sm"></span>
          <div>{like}</div>
        </div>
      </Button>
    </div>
  );
}
