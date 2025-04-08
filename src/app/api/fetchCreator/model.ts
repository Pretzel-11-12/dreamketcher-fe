export namespace _Model {
  export const name = 'creator/model';

  export interface ResPostWebtoon {
    id: number;
    email: string;
    nickname: string;
  }

  export interface ResEditWebtoon {
    id: number;
    email: string;
    nickname: string;
  }

  export interface CreatorWebtoons {
    content: { result: CreatorWebtoonUnit[]; totalElements: number };
    finishCount: number;
    inSeriesCount: number;
    newCount: number;
    preSeriesCount: number;
    restCount: number;
  }

  export interface CreatorWebtoonUnit {
    commentCount: number;
    episodeCount: number;
    id: number;
    interestedCount: number;
    likeCount: number;
    startedAt: string;
    thumbnail: string;
    title: string;
    updatedAt: string;
    author: string;
    avgStar: number;
    numOfStars: number;
    story: string;
    genre: string;
  }

  export interface CreatorWebtoonDetail {
    id: number;
    title: string;
    thumbnail: string;
    story: string;
    genre: string;
    tags: { id: string; content: string }[];
  }
}
