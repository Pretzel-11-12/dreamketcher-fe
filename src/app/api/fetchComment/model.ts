export namespace _Model {
  export const name = 'comment/model';

  export interface ResCommentUnit {
    id: number;
    nickname: string;
    content: string;
    childCommentCount: number;
    recommendationCount: number;
    notRecommendationCount: number;
    createdAt: string;
    profileImage: string;
  }

  export interface ResReCommentUnit {
    id: number;
    nickname: string;
    content: string;
    parentCommentId: number;
    commentOrder: number;
    recommendationCount: number;
    notRecommendationCount: number;
    createdAt: string;
    profileImage: string;
  }

  export interface ResMyCommentsUnit {
    webtoonId: string;
    episodeId: string;
    no: number;
    commentId: number;
    recommentId: number;
    content: string;
    thumbnail: string;
    title: string;
    episodeTitle: string;
    episodeThumbnail: string;
    childCommentCount: number;
    recommendationCount: number;
    notRecommendationCount: number;
    createdAt: string;
    type: string;
  }

  // export interface ResCommendUnit {
  //   id: number;
  // }
}
