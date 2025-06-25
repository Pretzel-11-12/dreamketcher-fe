export default function CardButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className="w-[141px] h-[39px] bg-bgGray border border-baseLine rounded-[5px] text-[16px] text-inActive"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
