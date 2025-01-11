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

    const response = await fetch(`/api/v1/webtoons/${id}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    // if (!response.ok) console.log(response);
    // throw new Error(`Failed to post favorite for webtoon: ${id} `);
    // return response.json();
  }

  export async function deleteFavoriteWebtoon(arg: {
    param: { id: string };
  }): Promise<any> {
    const { param } = arg;
    const { id } = param;

    const response = await fetch(`/api/v1/member/favorite/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
    // if (!response.ok)
    //   throw new Error(`Failed to delete favorite for webtoon: ${id}`);
    // return response.json();
  }

  export async function favoriteWebtoons() {
    const response = await fetch(`/api/v1/member/favorite`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) throw new Error(`Failed to get favorite webtoons`);
    return response.json();
  }

  export async function getEpisodeDetails(param: {
    webtoonId: string;
    episodeId: string;
  }): Promise<Model.EpisodeDetail> {
    const { webtoonId, episodeId } = param;
    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const res = await response.json();

    return { ...res, content: JSON.parse(res.content) };
  }

  export async function favoriteEpisode(param: {
    webtoonId: string;
    episodeId: string;
  }) {
    const { webtoonId, episodeId } = param;
    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/like`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    return response.json();
  }

  export async function putStars(param: {
    webtoonId: string;
    episodeId: string;
    star: number;
  }) {
    const { webtoonId, episodeId, star } = param;
    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/stars`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },

        body: JSON.stringify({
          point: star,
        }),
      }
    );

    return response.json();
  }
}
