export interface RecentWebtoon {
  id: number;
  image: string;
  title: string;
  writer: string;
  episodeCount: number;
  averageRating: number;
  stars: number;
  lastViewedAt: number;
}

const RECENT_WEBTOONS_KEY = 'recent_webtoons';
const MAX_RECENT_WEBTOONS = 3;

export const addRecentWebtoon = (
  webtoon: Omit<RecentWebtoon, 'lastViewedAt'>
) => {
  const recentWebtoons = getRecentWebtoons();

  // 이미 존재하는 웹툰이면 제거
  const filtered = recentWebtoons.filter((item) => item.id !== webtoon.id);

  // 새 웹툰을 배열 앞에 추가
  const newWebtoons = [
    { ...webtoon, lastViewedAt: Date.now() },
    ...filtered,
  ].slice(0, MAX_RECENT_WEBTOONS); // 최대 3개만 유지

  localStorage.setItem(RECENT_WEBTOONS_KEY, JSON.stringify(newWebtoons));
  return newWebtoons;
};

export const getRecentWebtoons = (): RecentWebtoon[] => {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(RECENT_WEBTOONS_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};
