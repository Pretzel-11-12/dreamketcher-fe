export const getWebtoonRanking = async (
  type: string,
  genre: string,
  order: string
) => {
  const baseUrl = '/api/v1/webtoons/ranking';

  const typeQuery = (() => {
    switch (type) {
      case 'default':
        return '';
      case 'new':
        return 'new';
      case 'finish':
        return 'finish';
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  })();

  const genreQuery = genre === 'RECOMMENDED' ? '' : `genre=${genre}`;

  const orderQuery = order ? `order=${order}` : '';

  const queryString = [genreQuery, orderQuery].filter(Boolean).join('&');

  const endpoint = typeQuery
    ? queryString
      ? `${baseUrl}/${typeQuery}?${queryString}`
      : `${baseUrl}/${typeQuery}`
    : queryString
    ? `${baseUrl}?${queryString}`
    : baseUrl;

  const res = await fetch(endpoint, {
    next: {
      tags: ['webtoons', type, genre, order],
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
