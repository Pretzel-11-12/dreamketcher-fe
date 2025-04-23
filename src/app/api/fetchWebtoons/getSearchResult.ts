import { _Model as __Model } from '@/app/api/fetchWebtoons/model';
import qs from 'qs';
export import Model = __Model;

export const getSearchWebtoonsByTitle = async (arg: {
  param: { keyword: string };
  query?: { fromFirst?: boolean; page?: number; size: number };
}): Promise<Model.PaginatedResponse> => {
  const baseUrl = '/api/v1/webtoons/search/title';
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

export const getSearchWebtoonsByAuthor = async (arg: {
  param: { keyword: string };
}) => {
  const baseUrl = '/api/v1/webtoons/search/author';
  const { param } = arg;
  const { keyword } = param;
  const endpoint = `${baseUrl}?keyword=${keyword}`;

  if (!keyword.trim()) {
    throw new Error('Keyword is required');
  }

  const res = await fetch(endpoint, {
    next: {
      tags: ['webtoons', 'search', 'author', keyword],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const getSearchWebtoonsByTag = async (arg: {
  param: { tagId: number };
}): Promise<Model.WebtoonDetailUnit[]> => {
  const baseUrl = '/api/v1/webtoons/tag';
  const { param } = arg;
  const { tagId } = param;
  const endpoint = `${baseUrl}/${tagId}`;

  if (!tagId) {
    throw new Error('TagId is required');
  }

  const res = await fetch(endpoint, {
    next: {
      tags: ['webtoons', 'search', 'tag', tagId.toString()],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
