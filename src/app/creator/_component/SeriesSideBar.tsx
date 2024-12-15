const SeriesSideBar: React.FC<{}> = () => {
  return (
    <div className="flex flex-col gap-2 w-[220px] border-r h-full items-center min-h-[1200px]">
      <span className="mdi mdi-account-circle text-gray-600/50 text-9xl"></span>
      <span>지나가는 나그네</span>
    </div>
  );
};

export default SeriesSideBar;
