const API_URL = '/api/v1';

interface FetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  body?: any;
  headers?: HeadersInit;
  isFormData?: boolean;
  retry?: boolean;
}

export const fetchAPI = async ({
  method,
  endpoint,
  body,
  headers = {},
  isFormData = false,
  retry = false,
}: FetchOptions): Promise<any> => {
  const accessToken = localStorage.getItem('accessToken');

  const defaultHeaders: HeadersInit = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: defaultHeaders,
    body: body && !isFormData ? JSON.stringify(body) : body,
  });

  if (!response.ok) {
    if (response.status === 401) {
      // accessToken 만료
      if (retry) {
        // 새 accessToken이 제대로 적용되지 않은 경우
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        throw new Error('만료된 토큰');
      }

      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          return fetchAPI({
            method,
            endpoint,
            body,
            headers,
            isFormData,
            retry: true,
          });
        }
      } catch (error) {
        // refreshToken 도 만료된 경우
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        throw new Error('만료된 토큰');
      }
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData);
    }
  }

  const contentType = response.headers.get('Content-Type');
  const hasBody = contentType && contentType.includes('application/json');

  return hasBody ? response.json() : null;
};

const refreshAccessToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch(`${API_URL}/auth/renew`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('refreshToken 만료');
  }

  const data = await response.json();
  const newAccessToken = data.accessToken;

  if (newAccessToken) {
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  }

  throw new Error('새로운 accessToken 발급 실패');
};
