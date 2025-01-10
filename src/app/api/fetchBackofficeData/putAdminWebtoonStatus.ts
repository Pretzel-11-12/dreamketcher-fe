export const getAdminWebtoonStatus = async (payload: {
  webtoonIds: number[];
  status: 'FINISH' | 'IN_SERIES' | 'REST';
}) => {
  const baseUrl = '/api/v1/admin/webtoons/status';

  const res = await fetch(baseUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    next: {
      tags: ['webtoons', 'admin', 'status'],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
