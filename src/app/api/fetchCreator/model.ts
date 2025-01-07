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
    result: CreatorWebtoonUnit[];
    totalElements: number;
  }

  export interface CreatorWebtoonUnit {
    id: number;
    no: number;
    title: string;
    thumbnail: string;
    updatedAt: string;
    startedAt: string;
    viewCount: number;
    commentCount: number;
    interestedCount: number;
  }
}
