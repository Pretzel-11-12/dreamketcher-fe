export const logout = async (accessToken: string) => {
  const response = await fetch('/api/v1/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
  return;
};
