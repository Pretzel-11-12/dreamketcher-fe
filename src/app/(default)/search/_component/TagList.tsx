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
  highlighted = false,
}: {
  children: React.ReactNode;
  highlighted?: boolean;
  tagId: number;
}) => {
  const router = useRouter();
  return (
    <div
      className="bg-gray-100 px-[5px] leading-[normal] flex items-center h-[20px] mr-1 rounded-[3px] text-inActive"
      onClick={() => {
        router.push(`/search/tag?tagId=${tagId}`);
      }}
    >
      {children}
    </div>
  );
};

const TagList = ({ tags, keyword = '', maxDisplay = 3 }: TagListProps) => {
  const displayedTags = tags.slice(0, maxDisplay);
  const remainingCount = tags.length - maxDisplay;
  return (
    <div className="flex flex-wrap p-0">
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

export default TagList;
