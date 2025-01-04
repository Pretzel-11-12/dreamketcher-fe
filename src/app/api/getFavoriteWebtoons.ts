export const getFavoriteWebtoons = async (token: string) => {
  const response = await fetch('/api/v1/member/favorite', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('관심 웹툰 데이터를 가져오는 데 실패했습니다.');
  }

  return response.json();
};
