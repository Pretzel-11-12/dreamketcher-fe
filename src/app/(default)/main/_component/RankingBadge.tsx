interface RankingBadgeProps {
  rank: number;
}

const RankingBadge = ({ rank }: RankingBadgeProps) => {
  return (
    <div className="bg-[#383838] text-white rounded-[5px] text-[11px] font-semibold flex items-center justify-center w-[21px] h-[21px]">
      {rank}
    </div>
  );
};

export default RankingBadge;
