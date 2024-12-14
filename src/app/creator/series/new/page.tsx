import SeriesForm from "../../_component/SeriesForm";

export default function SeriesNew() {
  return (
    <div className="flex flex-col mt-[80px] w-full px-12">
      <div className="text-xl font-semibold py-4 border-b">새 작품 등록</div>
      <div className="py-8">
        <SeriesForm />
      </div>
    </div>
  );
}
