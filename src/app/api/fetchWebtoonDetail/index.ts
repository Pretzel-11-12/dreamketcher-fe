import { _Model as __Model } from './model';
import qs from 'qs';

export namespace fetchWebtoonDetail {
  export import Model = __Model;

  export async function getWebtoonDetails(arg: {
    param: { id: string };
    query?: { fromFirst?: boolean; page?: number; size: number };
  }): Promise<Model.WebtoonDetailUnit> {
    const { param, query } = arg;
    const { id } = param;

    const queryString = query ? `?${qs.stringify(query)}` : '';

    const response = await fetch(
      `/api/v1/webtoons/${id}/episode` + queryString,
      {
        method: 'GET',
      }
    );
    if (!response.ok)
      throw new Error(`Failed to fetch details for webtoon: ${id}`);
    return response.json();
  }

  export async function postFavoriteWebtoon(arg: {
    param: { id: string };
  }): Promise<any> {
    const { param } = arg;
    const { id } = param;
    console.log(localStorage.getItem('accessToken'));

    const response = await fetch(`/api/v1/webtoons/${id}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Failed to post favorite for webtoon: ${id}`);
    return response.json();
  }

  export async function deleteFavoriteWebtoon(arg: {
    param: { id: string };
  }): Promise<any> {
    const { param } = arg;
    const { id } = param;
    console.log(localStorage.getItem('accessToken'));
    const response = await fetch(`/api/v1/member/favorite/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Failed to delete favorite for webtoon: ${id}`);
    return response.json();
  }
}
