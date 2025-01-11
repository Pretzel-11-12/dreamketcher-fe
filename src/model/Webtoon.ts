export interface Webtoon {
  id: number;
  title: string;
  member: string;
  thumbnail: string;
  genres: string[];
  lastEpisode: number;
  averageStar: number;
  numOfStars: number;
  description: string;
}

export interface FavoriteWebtoon {
  interestedWebtoonId: number;
  webtoonId: number;
  title: string;
  thumbnail: string;
  authorNickname: string;
  updatedAt: string;
  episodeCount: number;
  description: string;
  genres: string[];
}
