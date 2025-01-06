export namespace _Model {
  export const name = 'webtoonDetail/model';

  export interface WebtoonDetailUnit {
    webtoonId: number;
    webtoonTitle: string;
    webtoonThumbnail: string;
    webtoonStory: string;
    AuthorNickname: string;
    episode_count: number;
    genreNames: string[];
    currentPage: number;
    totalPages: number;
    episodes: EpisodeUnit[];
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
}
