import EpisodeListItem from "./EpisodeListItem";
import _ from "lodash";
import NoticeListItem from "./NoticeListItem";

const listItems = [
  {
    id: 1,
    title: `업로드 & 등장인물 프로필 UP`,
  },
  {
    id: 2,
    title: `연재 주기 공지`,
  },
];

export default function NoticeList({}) {
  const sortedListItems = _(listItems)
    .orderBy((item) => item.id, "desc")
    .take(2)
    .value();

  return (
    <div>
      {sortedListItems.map((item) => (
        <NoticeListItem title={item.title} index={item.id} />
      ))}
    </div>
  );
}
