import React, { useState } from "react";
import CommentItem from "./CommentItem";
import Dropdown from "@/app/_component/Dropdown";

const initialComments = [
  {
    id: 1,
    profileImage: "/assets/images/profile1.png",
    nickname: "유저1",
    content: "이 웹툰 너무 재밌어요!",
    webtoon: {
      thumbnail: "/assets/images/webtoon-thumbnail.jpg",
      title: "웹툰 제목1",
    },
    createdAt: "5분전",
    likes: 10,
    dislikes: 2,
    replies: 3,
  },
  {
    id: 2,
    profileImage: "/assets/images/profile2.png",
    nickname: "유저2",
    content: "스토리가 너무 예상되네요.",
    webtoon: {
      thumbnail: "/assets/images/webtoon-thumbnail2.jpg",
      title: "웹툰 제목2",
    },
    createdAt: "15분전",
    likes: 5,
    dislikes: 1,
    replies: 1,
  },
];

const dropdownOptions = [
  { label: "최근순", value: "recent" },
  { label: "오래된순", value: "oldest" },
];

export default function Comments() {
  const [sortOrder, setSortOrder] = useState("recent"); // 정렬 순서 상태
  const [comments, setComments] = useState(initialComments); // 댓글 상태

  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div>
      <div className="pt-4 mb-8">
        <Dropdown options={dropdownOptions} defaultOption="recent" />
      </div>

      {comments.length === 0 ? (
        <p className="text-gray-300 text-center pt-10">남긴 댓글이 없습니다.</p>
      ) : (
        <div>
          {sortedComments.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
      )}
    </div>
  );
}
