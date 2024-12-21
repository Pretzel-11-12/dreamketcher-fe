import EpisodeForm from "../../_component/EpisodeForm";

export default function EpisodeNew() {
  return (
    <div className="flex flex-col mt-[80px] w-full px-12">
      <div className="text-xl font-semibold py-4 border-b">회차 등록</div>
      <div className="py-8">
        <EpisodeForm />
      </div>
    </div>
  );
}
