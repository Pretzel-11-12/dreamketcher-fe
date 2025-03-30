import { EpisodeFormInfo } from '@/app/(creator)/creator/episode/_components/EpisodeForm';
import { _Model as __Model } from './model';
import qs from 'qs';

export namespace fetchCreatorWebtoon {
  export import Model = __Model;

  export async function getCreatorsWebtoons(arg?: {
    query: {
      status?: 'IN_SERIES' | 'FINISH' | 'NEW' | 'REST' | 'PRE_SERIES';
      page?: number;
      size?: number;
    };
  }): Promise<Model.CreatorWebtoons> {
    const { query } = arg || {};
    const queryString = query ? `?${qs.stringify(query)}` : '';

    const response = await fetch(`/api/v1/member/works` + queryString, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) throw new Error(`Failed to get creators webtoons`);
    return response.json();
  }

  export async function getCreatorsWebtoonDetail(arg: {
    param: { id: string };
  }): Promise<Model.CreatorWebtoonDetail> {
    const { param } = arg;
    const { id } = param;

    const response = await fetch(`/api/v1/webtoons/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) throw new Error(`Failed to get creators webtoon`);

    return await response.json();
  }
  // Complete
  export async function postWebtoon(arg: {
    title: string;
    thumbnail: string;
    genreId: string;
    story: string;
  }): Promise<Model.ResPostWebtoon> {
    const response = await fetch(`/api/v1/webtoons/upload`, {
      method: 'POST',
      body: JSON.stringify(arg),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`Failed to post webtoons`);
    return response.json();
  }

  export async function editWebtoon(arg: {
    webtoonId: number;
    body: {
      title: string;
      thumbnail: string;
      story: string;
      genreId: string;
    };
  }): Promise<any> {
    const { webtoonId, body } = arg;
    const response = await fetch(`/api/v1/webtoons/${webtoonId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
  }
  // Complete

  export async function deleteWebtoon(arg: {
    webtoonId: string;
  }): Promise<any> {
    const { webtoonId } = arg;

    const response = await fetch(`/api/v1/webtoons/${webtoonId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    console.log(response.json());
    if (!response.ok) throw new Error(`Failed to delete webtoons`);
    return response;
  }

  // Complete
  export async function postWebtoonThumbnail(arg: {
    formData: FormData;
  }): Promise<any> {
    const { formData } = arg;
    const response = await fetch(`/api/v1/webtoons/upload/thumbnail`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return await response.text();
  }
  // Complete
  export async function postWebtoonPrologue(arg: {
    formData: FormData;
  }): Promise<any> {
    const { formData } = arg;
    const response = await fetch(`/api/v1/webtoons/upload/prologue`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.json();
  }

  // 이미지 Put (edit)
  export async function editWebtoonThumbnail(arg: {
    webtoonId: number;
    formData: FormData;
  }): Promise<any> {
    const { formData, webtoonId } = arg;
    const response = await fetch(`/api/v1/webtoons/${webtoonId}/thumbnail`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.json();
  }

  export async function editWebtoonPrologue(arg: {
    webtoonId: string;
    thumbnail: string;
  }): Promise<any> {}
}

export namespace fetchCreatorEpisode {
  export async function postEpisode(arg: EpisodeFormInfo): Promise<any> {
    const response = await fetch(
      `/api/v1/webtoons/${arg.webtoonId}/episode/uploads`,
      {
        method: 'POST',
        body: JSON.stringify({
          title: arg.title,
          thumbnail: arg.thumbnail,
          content: arg.content,
          authorNote: arg.authorNote,
          publishedAt: arg.publishedAt,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) throw new Error(`Failed to post Episode`);

    return await response.json();
  }

  export async function editEpisode(arg: {
    item: EpisodeFormInfo;
    episodeId: string;
  }): Promise<any> {
    const { item, episodeId } = arg;
    const response = await fetch(
      `/api/v1/webtoons/${item.webtoonId}/episode/${episodeId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title: item.title,
          thumbnail: item.thumbnail,
          content: item.content,
          authorNote: item.authorNote,
          publishedAt: item.publishedAt,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  }

  export async function deleteEpisode(arg: {
    webtoonId: string;
    episodeId: string;
  }): Promise<any> {
    const { webtoonId, episodeId } = arg;

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/${episodeId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response;
  }

  // Complete
  export async function postEpisodeThumbnail(arg: {
    formData: FormData;
    webtoonId: string;
  }): Promise<any> {
    const { webtoonId, formData } = arg;

    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/thumbnail`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    return await response.text();
  }
  // Complete
  export async function postEpisodeContent(arg: {
    webtoonId: string;
    formData: FormData;
  }): Promise<any> {
    const { webtoonId, formData } = arg;
    const response = await fetch(
      `/api/v1/webtoons/${webtoonId}/episode/content`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.json();
  }

  // 이미지 수정
  export async function editEpisodeThumbnail(arg: {
    webtoonId: string;
    episodeId: string;
  }): Promise<any> {}

  export async function editEpisodeContent(arg: {
    webtoonId: string;
    episodeId: string;
  }): Promise<any> {}
}
