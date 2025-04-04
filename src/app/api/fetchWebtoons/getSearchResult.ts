import { _Model as __Model } from '@/app/api/fetchWebtoonDetail/model';
import qs from 'qs';
export import Model = __Model;

export const getSearchResult = async (arg: {
  param: { keyword: string };
  query?: { fromFirst?: boolean; page?: number; size: number };
}): Promise<Model.PaginatedResponse> => {
  const baseUrl = '/api/v1/webtoons/search';
  const { param, query } = arg;
  const { keyword } = param;
  const queryString = query ? `&${qs.stringify(query)}` : '';
  const endpoint = `${baseUrl}?keyword=${keyword}${queryString}`;

  if (!keyword.trim()) {
    throw new Error('Keyword is required');
  }

  const res = await fetch(endpoint, {
    next: {
      tags: ['webtoons', 'search', keyword],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
