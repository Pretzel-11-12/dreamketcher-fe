export namespace _Model {
  export const name = 'webtoonDetail/model';

  export interface WebtoonDetail {
    webtoonId: number;
    webtoonTitle: string;
    webtoonThumbnail: string;
    webtoonStory: string;
    AuthorNickname: string;
    interestCount: number;
    genreName: string;
    tags: Tag[];
  }

  interface Tag {
    id: number;
    content: string;
  }

  export interface Episodes {
    webtoonId: number;
    episode_count: number;
    currentPage: number;
    totalPages: number;
    episodes: Episode[];
  }

  interface Episode {
    episodeId: number;
    no: number;
    title: string;
    thumbnail: string;
    publishedAt: string;
    viewCount: number;
    likeCount: number;
    averageStar: number;
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
