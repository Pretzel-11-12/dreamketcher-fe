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

  const data = await res.json(); // 전체 데이터를 비동기로 파싱
  return data.content; // content 부분만 반환
};
