export const getAdminUsers = async (
  status: string,
  page: number,
  size: number
) => {
  const url = `/api/v1/admin/member?status=${status}&page=${page}&size=${size}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  if (!response.ok) {
    throw new Error('사용자 데이터를 가져오는데 실패했습니다.');
  }

  return response.json();
};
