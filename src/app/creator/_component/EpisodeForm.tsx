import Button from "@/app/_component/Button";
import Input from "@/app/_component/Input";
import RadioButton from "@/app/_component/RadioButton";

export interface EpisodeFormInfo {
  title: string;
  index: number;
  thumbnail: string;
  images: string[];
  author_note: string;
  private_setting: string;
}
const EpisodeForm = () => {
  return (
    <div className="flex flex-col w-full gap-12 pb-20">
      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>회차 제목</div>
        <Input placeholder="제목을 입력해주세요." subText="0/30" />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>회차 번호</div>
        <Input placeholder="1" />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>회차 썸네일</div>
        <div className="w-[200px] h-[200px] bg-slate-400/20"></div>
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>원고 등록</div>
        <div className="w-[200px] h-[200px] bg-slate-400/20"></div>
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작가의 말</div>
        <Input placeholder="작가의 말을 작성해주세요." />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start pb-14">
        <div>공개 설정</div>
        <RadioButton
          options={[
            { id: "public", label: "공개" },
            { id: "prvate", label: "비공개" },
            { id: "scheduled", label: "예약공개" },
          ]}
        />
      </div>

      <Button props={{ size: "L", variant: "brand-yellow" }}>
        회차 등록하기
      </Button>
    </div>
  );
};

export default EpisodeForm;
