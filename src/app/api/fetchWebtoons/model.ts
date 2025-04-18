import { Webtoon as IWebtoon } from '@/model/Webtoon';

export namespace _Model {
  export const name = 'webtoonDetail/model';

  export interface PaginatedResponse {
    results: IWebtoon[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
  }

  export interface IWriter {
    id: number;
    name: string;
    profileImage: string;
    webtoons: string[];
    authorNickname: string;
    representativeWorkTitle: string;
    workCount: number;
  }

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
