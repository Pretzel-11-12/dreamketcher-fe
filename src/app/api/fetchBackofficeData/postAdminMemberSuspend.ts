export const postAdminMemberSuspend = async (payload: {
  memberId: number;
  suspensionDays: number;
  reasonCode:
    | 'INSULT'
    | 'PORN'
    | 'VIOLENCE'
    | 'ILLEGAL'
    | 'GAMBLING'
    | 'SPAM'
    | 'SCAM'
    | 'COPYRIGHT'
    | 'IMPERSONATION'
    | 'OUT_OF_SCOPE'
    | 'ETC';
  suspensionReason: string;
}) => {
  const { memberId, ...data } = payload;
  const baseUrl = `/api/v1/admin/member/${memberId}/suspend`;

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('회원 정지 처리에 실패했습니다.');
  }

  return res;
};
