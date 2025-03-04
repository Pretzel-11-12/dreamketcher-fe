import { highlightKeyword } from '@/app/util/highlightKeyword';

interface TagListProps {
  tags: string[];
  keyword?: string;
  maxDisplay?: number;
}

const Tag = ({
  children,
  highlighted = false,
}: {
  children: React.ReactNode;
  highlighted?: boolean;
}) => (
  <div className="bg-gray-100 px-[5px] leading-[normal] flex items-center h-[20px] mr-1 rounded-[3px]">
    {children}
  </div>
);

const TagList = ({ tags, keyword = '', maxDisplay = 3 }: TagListProps) => {
  const displayedTags = tags.slice(0, maxDisplay);
  const remainingCount = tags.length - maxDisplay;

  return (
    <div className="flex flex-wrap p-0">
      {displayedTags.map((tag, index) => (
        <Tag key={index}>{highlightKeyword(tag, keyword)}</Tag>
      ))}
      {remainingCount > 0 && (
        <div
          className="flex ml-0 items-center justify-center leading-[normal]"
          key="extra"
        >
          외 {remainingCount}개
        </div>
      )}
    </div>
  );
};

export default TagList;
