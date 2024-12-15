import CategoryTab, { CategoryItemProps } from "@/app/_component/CategoryTab";

const categories: CategoryItemProps[] = [
  { id: "ing", label: "연재중", subLabel: "(0)" },
  { id: "done", label: "완결", subLabel: "(0)" },
  { id: "rest", label: "휴재", subLabel: "(0)" },
  { id: "practice", label: "습작", subLabel: "(0)" },
  { id: "trash", label: "휴지통", subLabel: "(0)" },
];
export default function SeriesCategorySelector() {
  return <CategoryTab items={categories} selectedId={categories[0].id} />;
}
