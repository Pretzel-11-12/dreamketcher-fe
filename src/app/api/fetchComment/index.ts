import { _Model as __Model } from './model';
import qs from 'qs';

export namespace fetchComment {
  export import Model = __Model;

  export async function getComments(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
    };
    query: {
      page: number;
      size: number;
      order: 'DESC' | 'ASC';
    };
  }): Promise<{ result: Model.ResCommentUnit[]; totalElements: number }> {
    const { param, query } = arg;
    const { webtoonId, episodeId } = param;

    const queryString = arg.query ? `?${qs.stringify(query)}` : '';

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/comments` +
        queryString,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    return response.json();
  }

  export async function postComment(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      content: string;
    };
  }): Promise<{ id: number }> {
    const { param } = arg;
    const { webtoonId, episodeId, content } = param;

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}/comments/create`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content }),
      }
    );

    return response.json();
  }
}
