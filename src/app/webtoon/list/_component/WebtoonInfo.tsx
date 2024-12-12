import Button from "@/app/_component/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export enum Tag {
  SCARED = "괴담",
  ROMANCE = "로맨스",
  HORROR = "호러",
}

interface webtoonData {
  id: number;
  image: string;
  title: string;
  writer: string;
  genre: string;
  description: string;
  interest: number;
  tags?: Tag[];
}

type webtoonDataProps = {
  webtoon: webtoonData;
};

const WebtoonInfo: React.FC<webtoonDataProps> = ({ webtoon }) => {
  const [isUserInterest, setInterest] = useState(false);
  const { title, image, writer, description, tags, id, interest, genre } =
    webtoon;
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 pr-4">
      <Image src={image} alt={title} width={200} height={300} />
      <div className="flex flex-col gap-3 relative">
        <div className="text-2xl font-semibold">{title}</div>
        <div className="flex gap-1 items-center">
          <div className="text-sm">{writer}</div>
          <div className="text-sm text-gray-900/40">글/ 그림 | {genre}</div>
        </div>
        <div className="text-sm">{description}</div>

        <div className="text-sm flex gap-1">
          {tags?.map((tag, i) => (
            <div
              key={i}
              className="bg-brand-gray rounded-sm px-2 py-0.5 text-[#888888] text-xs"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-1 absolute w-full bottom-0">
          <Button
            props={{
              size: "S",
              variant: isUserInterest ? "transparent" : "brand-yellow",
              containerStyles: "border border-brand-yellow text-brand-yellow",
              handleClick: () => setInterest(!isUserInterest),
            }}
          >
            <div className="flex gap-2 items-center justify-center">
              <span
                className={`mdi ${
                  isUserInterest ? "mdi-check" : "mdi-plus"
                } text-xl`}
              ></span>
              관심 {interest}
            </div>
          </Button>

          <Button props={{ size: "S", variant: "brand-gray" }}>
            <Link
              href={{
                pathname: "/webtoon/detail",
                query: { titleId: id, no: "1" },
              }}
            >
              <div className="flex gap-2 items-center justify-center">
                첫 화 보기
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebtoonInfo;
