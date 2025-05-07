export default function CardButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button className="w-[141px] h-[39px] bg-[#f9f9f9] border-1 border-[#e0e0e0] rounded-[5px] text-[16px] text-[#888888]">
      {text}
    </button>
  );
}
