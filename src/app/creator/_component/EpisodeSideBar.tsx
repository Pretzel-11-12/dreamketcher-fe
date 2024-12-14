const EpisodeSideBar: React.FC<{}> = () => {
  return (
    <div className="flex flex-col gap-2 w-[200px] border-r h-full items-center min-h-[1200px] p-3">
      <div className="bg-gray-500/20 w-full h-[250px] rounded-sm"></div>
      <span>별종의 세계</span>

      <div className="flex flex-col w-full pt-[100px] text-md">
        <button className="w-full h-[50px] bg-[#E4EBFF] text-brand-blue">
          <div className="flex items-center justify-center gap-2 w-full h-full">
            <span className="mdi mdi-list-box"></span>
            회차 리스트
          </div>
        </button>
        <button className="w-full h-[50px]">
          <div className="flex items-center justify-center gap-2 w-full h-full">
            <span className="mdi mdi-information"></span>
            작품 정보
          </div>
        </button>
      </div>
    </div>
  );
};

export default EpisodeSideBar;
