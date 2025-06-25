export const postAdminMemberActivate = async (payload: {
  memberId: number;
}) => {
  const { memberId } = payload;
  const baseUrl = `/api/v1/admin/member/${memberId}/activate`;

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('회원 활성화 처리에 실패했습니다.');
  }

  return res;
};
