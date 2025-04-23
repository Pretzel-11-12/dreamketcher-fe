interface RankingBadgeProps {
  rank: number;
}

const RankingBadge = ({ rank }: RankingBadgeProps) => {
  return (
    <div className="bg-[#383838]/50 text-white rounded-[5px] text-[11px] font-semibold flex items-center justify-center w-[21px] h-[21px] leading-[175%]">
      {rank}
    </div>
  );
};

export default RankingBadge;
