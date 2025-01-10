export const getAdminWebtoons = async () => {
  const baseUrl = '/api/v1/admin/webtoons';

  const res = await fetch(baseUrl, {
    next: {
      tags: ['webtoons', 'admin'],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
