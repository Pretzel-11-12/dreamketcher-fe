import Image from "next/image";

const EpisodeButtonGroup = () => {
  return (
    <>
      <div className="bg-[#fffff] border rounded-md flex w-full h-[100px] hover:cursor-pointer">
        <div className="w-full h-full flex flex-col items-center justify-center border-r p-4 hover:bg-slate-300/20">
          <Image
            src={"/assets/images/like.svg"}
            alt="likeBtn"
            width={22}
            height={22}
          />
          <div className="text-lg font-medium pt-1.5">좋아요</div>
          <div className="text-sm text-gray-500/90 -mt-0.5">30</div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center border-r p-4 hover:bg-slate-300/20 gap-0.5">
          <Image
            src={"/assets/images/like.svg"}
            alt="likeBtn"
            width={22}
            height={22}
          />
          <div className="text-lg font-medium pt-1.5">관심웹툰</div>
          <div className="text-sm text-gray-500/90 -mt-0.5">1147</div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center border-r p-4 hover:bg-slate-300/20 gap-0.5">
          <Image
            src={"/assets/images/like.svg"}
            alt="likeBtn"
            width={22}
            height={22}
          />
          <div className="text-lg font-medium pt-1.5">별점주기</div>
          <div className="text-sm text-gray-500/90 -mt-0.5">4.95</div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center border-r p-4 hover:bg-slate-300/20 gap-0.5">
          <Image
            src={"/assets/images/like.svg"}
            alt="likeBtn"
            width={22}
            height={22}
          />
          <div className="text-lg font-medium pt-1.5">신고하기</div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center p-4 hover:bg-slate-300/20 gap-0.5">
          <Image
            src={"/assets/images/like.svg"}
            alt="likeBtn"
            width={22}
            height={22}
          />
          <div className="text-lg font-medium pt-1.5">공유하기</div>
        </div>
      </div>
    </>
  );
};

export default EpisodeButtonGroup;
