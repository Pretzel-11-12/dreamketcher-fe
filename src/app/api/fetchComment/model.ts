export namespace _Model {
  export const name = 'comment/model';

  export interface ResCommentUnit {
    id: number;
    nickname: string;
    content: string;
    childCommentCount: number;
    createdAt: string;
  }

  export interface ResReCommentUnit {
    id: number;
    nickname: string;
    content: string;
    parentCommentId: number;
    commentOrder: number;
    createdAt: string;
  }
}
