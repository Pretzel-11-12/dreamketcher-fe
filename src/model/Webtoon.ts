import { _Model as __Model } from '@/app/api/fetchWebtoons/model';
export import Model = __Model;

export interface Webtoon {
  id: number;
  title: string;
  member: string;
  thumbnail: string;
  genre: string;
  lastEpisode: number;
  averageStar: number;
  numOfStars: number;
  story: string;
  tags: Model.Tag[];
}

export interface MyWebtoon {
  id: number;
  title: string;
  thumbnail: string;
  authorNickname: string;
  story: string;
  episodeCount: number;
  avgStar: number;
  numOfStars: number;
  genre: string;
}

export interface BeforeFavoriteWebtoon {
  interestedWebtoonId: number;
  webtoonId: number;
  title: string;
  thumbnail: string;
  authorNickname: string;
  updatedAt: string;
  episodeCount: number;
  story: string;
  genre: string;
}

export interface FavoriteWebtoon {
  folderId: number;
  folderName: string;
  content: FavoriteWebtoonContent[];
  total: number;
}

export interface FavoriteWebtoonContent {
  webtoonId: number;
  title: string;
  thumbnail: string;
  authorNickname: string;
  updatedAt: string;
  genre: string;
  episodeCount: number;
}

export interface RecentWatchedWebtoon {
  id: number;
  image: string;
  title: string;
  writer: string;
  episodeCount: number;
  averageRating: number;
  stars: number;
  lastViewedAt: number;
  genre: string;
}

export interface UserWebtoon {
  id: number;
  title: string;
  thumbnail: string;
  authorNickname: string;
  story: string;
  episodeCount: number;
  avgStar: number;
  numOfStars: number;
  genre: string;
  commentCount: number;
}