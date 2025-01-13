export const getAdminWebtoonApproval = async (payload: {
  webtoonIds: number[];
  approval: 'APPROVAL_DENIED' | 'APPROVAL';
  reason: string;
  detailReason: string;
}) => {
  const baseUrl = '/api/v1/admin/webtoons/approval';

  const res = await fetch(baseUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    next: {
      tags: ['webtoons', 'admin', 'approval'],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res;
};
