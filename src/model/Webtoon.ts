export interface Webtoon {
  title: string;
  thumbnail: string;
  genres: string;
  lastEpisode: number;
  averageStar: number;
  numOfStars: number;
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
