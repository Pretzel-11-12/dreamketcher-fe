import User, { UserInfo } from "../_component/User";
import Comment, { CommentInfo } from "../_component/Comment";

interface DetailUnit {
  title: string;
  images: string[];
  detail: { like: number; interest: number; star: number };
  writerInfo: UserInfo;
}

export default async function Detail({
  params,
  searchParams,
}: {
  params: Promise<{ params: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { titleId, no } = await searchParams;

  let item: DetailUnit = {
    title: "Loading...",
    images: [],
    detail: { like: 0, interest: 0, star: 0 },
    writerInfo: { name: "", description: "" },
  };
  let comments: CommentInfo[] = [];

  try {
    const response: { data: any } = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            title: titleId,
            images: [],
            writerInfo: {
              name: "바크베",
              description: `그룹명 'aespa (에스파)'는 ‘아바타 X 익스피리언스 (Avatar X Experience)’를 표현한 ‘æ’와 양면이라는 뜻의 영단어
              ‘aspect’를 결합해 만든 이름이다. 그룹명을 æspa로 표기할 때도 있다.`,
            },
            detail: { like: 38, interest: 1147, star: 4.85 },
          },
        });
      }, 300);
    });

    const commnets: { data: any } = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              name: "comment 1",
              description: `comment 1`,
              like: 1,
              timestamp: 1730766637666,
            },
            {
              id: 2,
              name: "comment 2",
              description: `그룹명 'aespa (에스파)'는 ‘아바타 X 익스피리언스 (Avatar X Experience)’를 표현한 ‘æ’와 양면이라는 뜻의 영단어 ‘aspect’를 결합해 만든 이름이다. 그룹명을 æspa로 표기할 때도 있다.`,
              like: 1,
              timestamp: 1730766637666,
            },
            {
              id: 3,
              name: "comment 3",
              description: `comment 3`,
              like: 1,
              timestamp: 1730766637666,
            },
          ],
        });
      }, 300);
    });

    item = await response.data;
    comments = await commnets.data;
  } catch (error) {
    console.error("Error fetching webtoon detail:", error as Error);
  }

  return (
    <div className="flex flex-col gap-16 w-[800px] items-center justify-center text-md">
      <div className="bg-[#D9D9D9] h-[2000px] w-full"></div>

      <div className="bg-[#fffff] border rounded-md flex w-full h-[100px] hover:cursor-pointer">
        <div className="w-full h-full flex flex-col items-center justify-center border-r p-4 hover:bg-slate-300/20 gap-0.5">
          <span className="mdi mdi-thumb-up-outline text-xl"></span>
          <div>좋아요</div>
          <div>{item.detail?.like}</div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center border-r p-4 hover:bg-slate-300/20 gap-0.5">
          <span className="mdi mdi-plus text-xl"></span>
          <div>관심웹툰</div>
          <div>{item.detail?.interest}</div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center border-r p-4 hover:bg-slate-300/20 gap-0.5">
          <span className="mdi mdi-star-outline text-xl"></span>
          <div>별점주기</div>
          <div>{item.detail?.star}</div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center border-r p-4 hover:bg-slate-300/20 gap-0.5">
          <span className="mdi mdi-bell-alert text-xl"></span>
          <div>신고하기</div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center p-4 hover:bg-slate-300/20 gap-0.5">
          <span className="mdi mdi-export-variant text-xl"></span>
          <div>공유하기</div>
        </div>
      </div>

      <div className="h-full w-full flex flex-col gap-5">
        <div>작가의 말</div>
        <User
          name={item.writerInfo?.name}
          description={item.writerInfo?.description}
        />
        <div>댓글</div>
        <div className="flex flex-col gap-2">
          {comments.map((comment) => (
            <Comment
              id={comment.id}
              name={comment.name}
              description={comment.description}
              like={comment.like}
              timestamp={comment.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
