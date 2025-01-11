import { EpisodeFormInfo } from '@/app/(creator)/creator/episode/_components/EpisodeForm';
import { _Model as __Model } from './model';
import qs from 'qs';

export namespace fetchCreatorWebtoon {
  export import Model = __Model;

  // Complete
  export async function getCreatorsWebtoon(arg?: {
    query: { status?: string; page?: number; size?: number };
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
  // Complete
  export async function postWebtoon(arg: {
    title: string;
    thumbnail: string;
    prologue: string;
    story: string;
    description: string;
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
    webtoonId: string;
    body: {
      title: string;
      thumbnail: string;
      prologue: string;
      story: string;
      description: string;
      // genre: string;
    };
  }): Promise<any> {
    const { webtoonId, body } = arg;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${webtoonId}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) throw new Error(`Failed to edit webtoons`);
    return response.json();
  }
  // Complete
  export async function deleteWebtoon(arg: {
    webtoonId: string;
  }): Promise<any> {
    const { webtoonId } = arg;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${webtoonId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) throw new Error(`Failed to delete webtoons`);
    return response.json();
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
    webtoonId: string;
    episodeId: string;
    thumbnail: string;
  }): Promise<any> {}

  export async function editWebtoonPrologue(arg: {
    webtoonId: string;
    thumbnail: string;
  }): Promise<any> {}
}

export namespace fetchCreatorEpisode {
  export async function postEpisode(
    arg: Omit<EpisodeFormInfo, 'id'>
  ): Promise<any> {
    const response = await fetch(
      `/api/v1/webtoons/${arg.webtoonId}/episode/uploads`,
      {
        method: 'POST',
        body: JSON.stringify({
          title: arg.title,
          thumbnail: arg.thumbnail,
          content: arg.content,
          authorNote: arg.authorNote,
          publishedAt: arg.publishedAt || '2025-01-31',
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) throw new Error(`Failed to post Episode`);
    return response.json();
  }

  export async function editEpisode(arg: {
    webtoonId: string;
    episodeId: string;
    title: string;
    thumbnail: string;
    content: string;
    authorNote: string;
    publishedAt: string;
  }): Promise<any> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${arg.webtoonId}/episode/${arg.episodeId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title: arg.title,
          thumbnail: arg.thumbnail,
          content: arg.content,
          authorNote: arg.authorNote,
          publishedAt: arg.publishedAt,
          // publishedAt: '2025-01-06',
        }),
      }
    );
    if (!response.ok) throw new Error(`Failed to edit Episode`);
    return response.json();
  }

  export async function deleteEpisode(arg: {
    webtoonId: string;
    episodeId: string;
  }): Promise<any> {
    const { webtoonId, episodeId } = arg;

    const response = await fetch(`/api/v1/webtoons/${webtoonId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.json();
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
