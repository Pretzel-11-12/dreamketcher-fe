export namespace _Model {
  export const name = 'webtoonDetail/model';

  export interface WebtoonDetailUnit {
    webtoonId: number;
    webtoonTitle: string;
    webtoonThumbnail: string;
    webtoonStory: string;
    AuthorNickname: string;
    episode_count: number;
    interestCount: number;
    genreName: string;
    currentPage: number;
    totalPages: number;
    episodes: EpisodeUnit[];
  }

  export interface WebtoonUnit {
    webtoonId: number;
    webtoonTitle: string;
    webtoonThumbnail: string;
    webtoonStory: string;
    AuthorNickname: string;
    interestCount: number;
    genreName: string;
    tags: TagUnit[];
  }

  export interface TagUnit {
    id: number;
    content: string;
  }

  export interface EpisodeUnit {
    episodeId: number;
    title: string;
    thumbnail: string;
    publishedAt: string;
    viewCount: number;
    likeCount: number;
    averageStar: number;
  }

  export interface EpisodeDetail {
    authorNote: string;
    authorName: string;
    authorImage: string;
    content: string[];
    id: number;
    no: number;
    thumbnail: string;
    webtoonThumbnail: string;
    webtoonTitle: string;
    genre: string;
    title: string;
    viewCount: number;
    likeCount: number;
    averageStar: number;
  }
}
