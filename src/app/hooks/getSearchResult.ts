export const getSearchResult = async (keyword: string) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/search`;

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
  console.log(res.json());
  return res.json();
};
