import Button from "@/app/_component/Button";
import Input from "@/app/_component/Input";
import RadioButton from "@/app/_component/RadioButton";
import Textarea from "@/app/_component/Textarea";

export interface SeriesFormInfo {
  title: string;
  genre: string;
  image: string;
  description: string;
  summary: string;
}
const SeriesForm = () => {
  const options = [
    { label: "로맨스", id: "1" },
    { label: "판타지", id: "2" },
    { label: "무협", id: "3" },
    { label: "일상", id: "4" },
    { label: "스릴러", id: "5" },
    { label: "공포", id: "6" },
    { label: "액션", id: "7" },
    { label: "스포츠", id: "8" },
    { label: "개그", id: "9" },
    { label: "소년", id: "10" },
  ];

  return (
    <div className="flex flex-col w-full gap-12 pb-20">
      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품제목</div>
        <Input placeholder="제목을 입력해주세요." subText="0/30" />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>장르</div>
        <RadioButton options={options} />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>이용가</div>
        <RadioButton
          options={[
            { id: "all", label: "전체 이용가" },
            { id: "adult", label: "성인" },
          ]}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품 표지</div>
        <div className="w-[200px] h-[200px] bg-slate-400/20"></div>
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-baseline">
        <div>작품 설명</div>
        <Textarea
          placeholder="작품 설명에 필요한 내용을 작성해주세요."
          subText="0/30"
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품 한줄 설명</div>
        <Input
          placeholder="작품에 대한 설명을 한줄로 적어주세요."
          subText="0/400"
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start pb-14">
        <div>작품 태그</div>
        <Input />
      </div>

      <Button props={{ size: "L", variant: "brand-yellow" }}>
        작품 등록하기
      </Button>
    </div>
  );
};

export default SeriesForm;
