import { _Model as __Model } from '@/app/api/fetchWebtoons/model';
export import Model = __Model;

export const getSearchWriterResult = async (arg: {
  param: { keyword: string };
}): Promise<Model.WriterResponse> => {
  const baseUrl = '/api/v1/webtoons/search';
  const { param } = arg;
  const { keyword } = param;
  const endpoint = `${baseUrl}?keyword=${encodeURIComponent(keyword)}`;

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
