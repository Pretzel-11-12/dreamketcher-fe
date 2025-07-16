import { highlightKeyword } from '@/app/util/highlightKeyword';
import { useRouter } from 'next/navigation';
import { _Model as __Model } from '@/app/api/fetchWebtoons/model';
export import Model = __Model;
interface TagListProps {
  tags: Model.Tag[];
  keyword?: string;
  maxDisplay?: number;
}

const Tag = ({
  children,
  tagId,
}: {
  children: React.ReactNode;
  tagId: number;
}) => {
  const router = useRouter();
  return (
    <div
      className="bg-gray-100 px-[10px] py-[5px] leading-[normal] flex items-center rounded-[5px] text-inActive hover:bg-gray-200 cursor-pointer text-[13px]"
      onClick={() => {
        router.push(`/search/tag?tagId=${tagId}`);
      }}
    >
      {children}
    </div>
  );
};

const WebtoonTagList = ({
  tags,
  keyword = '',
  maxDisplay = 3,
}: TagListProps) => {
  const displayedTags = tags.slice(0, maxDisplay);
  const remainingCount = tags.length - maxDisplay;
  return (
    <div className="flex flex-wrap gap-2">
      {displayedTags.map((tag, index) => (
        <Tag key={index} tagId={tag.id}>
          {highlightKeyword(tag.content, keyword)}
        </Tag>
      ))}
      {remainingCount > 0 && (
        <div
          className="flex ml-0 items-center justify-center leading-[normal] text-inActive"
          key="extra"
        >
          외 {remainingCount}개
        </div>
      )}
    </div>
  );
};

export default WebtoonTagList;
