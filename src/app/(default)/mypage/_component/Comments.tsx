import React, { useState } from "react";
import CommentItem from "./CommentItem";
import Dropdown from "@/app/_component/Dropdown";
import { useQuery } from '@tanstack/react-query';
import { fetchComment } from '@/app/api/fetchComment';

const dropdownOptions = [
  { label: "최근순", value: "recent" },
  { label: "오래된순", value: "oldest" },
];

export default function Comments() {
  //const [sortOrder, setSortOrder] = useState("recent"); // 정렬 순서 상태
  //const [comments, setComments] = useState(initialComments); // 댓글 상태

  // const sortedComments = [...comments].sort((a, b) => {
  //   const dateA = new Date(a.createdAt).getTime();
  //   const dateB = new Date(b.createdAt).getTime();
  //
  //   return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
  // });

  const { data: comments } = useQuery({
    queryKey: ['myComments'],
    queryFn: () =>
      fetchComment.getMyComments({
        query: { size: 20, page: 0, order: 'DESC' },
      }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const { totalElements, result } = comments || {
    totalElements: 0,
    result: [],
  };

  return (
    <div>
      <div className="pt-4 mb-8">
        <Dropdown options={dropdownOptions} defaultOption="recent" />
      </div>

      {!result ? (
        <p className="text-gray-300 text-center pt-10">남긴 댓글이 없습니다.</p>
      ) : (
        <div>
          {result?.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
      )}
    </div>
  );
}
