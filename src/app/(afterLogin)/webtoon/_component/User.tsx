export interface UserInfo {
  name: string;
  description: string;
}
export default function User({ name, description }: UserInfo) {
  return (
    <div className="flex p-3 border rounded-md gap-2">
      <span className="mdi mdi-account-circle text-gray-600/90 text-5xl"></span>
      <div className="flex flex-col gap-1">
        <div className="font-bold">{name}</div>
        <div className="font-thin">{description}</div>
      </div>
    </div>
  );
}
