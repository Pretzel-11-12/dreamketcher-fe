export const getSearchResult = async (keyword: string) => {
  const baseUrl = '/api/v1/webtoons/search';

  const endpoint = `${baseUrl}?keyword=${keyword}`;

  if (!keyword.trim()) {
    throw new Error('Keyword is required');
  }

  const res = await fetch(endpoint, {
    next: {
      tags: ['webtoons', 'search', keyword],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
