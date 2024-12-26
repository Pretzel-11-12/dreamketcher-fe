export const getWebtoonRanking = async (genre: string) => {
  const endpoint =
    genre === 'RECOMMEND'
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/ranking`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/ranking?genre=${genre}`;

  const res = await fetch(endpoint, {
    next: {
      tags: ['webtoons', 'ranking'],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
