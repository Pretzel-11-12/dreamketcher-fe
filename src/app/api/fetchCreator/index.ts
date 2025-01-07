import { _Model as __Model } from './model';
import qs from 'qs';

//TODO: getCreatorsWebtoon 제외하고 요청 확인 필요. API 작업 완료 안 되었음. 2025.01.06
export namespace fetchCreatorWebtoon {
  export import Model = __Model;

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

  export async function postWebtoon(arg: {
    title: string;
    thumbnail: string;
    prologue: string;
    story: string;
    description: string;
    // genre: string;
  }): Promise<Model.ResPostWebtoon> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/upload`,
      {
        method: 'POST',
        body: JSON.stringify(arg),
      }
    );
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

  // 이미지 Post
  export async function postWebtoonThumbnail(arg: {
    webtoonId: string;
    thumbnail: string;
  }): Promise<any> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/upload/thumbnail`,
      {
        method: 'POST',
        body: JSON.stringify(arg),
      }
    );
    if (!response.ok) throw new Error(`Failed to post Webtoon Thumbnail`);
    return response.json();
  }

  export async function postWebtoonPrologue(arg: {
    webtoonId: string;
    prologues: string[];
  }): Promise<any> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/upload/prologue`,
      {
        method: 'POST',
        // body: JSON.stringify(arg),
      }
    );
    if (!response.ok) throw new Error(`Failed to post Webtoon Prologue`);
    return response.json();
  }

  // 이미지 Put (edit)
  export async function editWebtoonThumbnail(arg: {
    webtoonId: string;
    episodeId: string;
    thumbnail: string;
  }): Promise<any> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/:id/episode/:id/thumbnail`,
      {
        method: 'POST',
        // body: JSON.stringify(arg),
      }
    );
    if (!response.ok) throw new Error(`Failed to edit Webtoon Thumbnail`);
    return response.json();
  }

  export async function editWebtoonPrologue(arg: {
    webtoonId: string;
    thumbnail: string;
  }): Promise<any> {}
}

export namespace fetchCreatorEpisode {
  export async function postEpisode(arg: {
    webtoonId: string;
    title: string;
    thumbnail: string;
    content: string;
    authorNote: string;
    publishedAt: string;
  }): Promise<any> {
    const response = await fetch(
      // `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${arg.webtoonId}/episode/uploads?memberId=1`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${arg.webtoonId}/episode/uploads`,
      {
        method: 'POST',
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${webtoonId}/episode/${episodeId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) throw new Error(`Failed to delete episode`);
    return response.json();
  }

  // 이미지 업로드
  export async function postEpisodeThumbnail(arg: {
    memberId: string;
    webtoonId: string;
    thumbnail: string;
  }): Promise<any> {
    const { webtoonId, thumbnail } = arg;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${webtoonId}/episode/thumbnail`,
      {
        method: 'POST',
        body: JSON.stringify(arg),
      }
    );
    if (!response.ok) throw new Error(`Failed to post Episode Thumbnail`);
    return response.json();
  }

  export async function postEpisodeContent(arg: {
    memberId: string;
    webtoonId: string;
    thumbnail: string;
  }): Promise<any> {
    const { webtoonId, thumbnail } = arg;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${webtoonId}/episode/content`,
      {
        method: 'POST',
        // body: JSON.stringify(arg),
      }
    );
    if (!response.ok) throw new Error(`Failed to post Episode Content`);
    return response.json();
  }

  // 이미지 수정
  export async function editEpisodeThumbnail(arg: {
    webtoonId: string;
    episodeId: string;
  }): Promise<any> {
    const { webtoonId, episodeId } = arg;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${webtoonId}/episode/${episodeId}/thumbnail`,
      {
        method: 'PUT',
        // body: JSON.stringify(arg),
      }
    );
    if (!response.ok) throw new Error(`Failed to edit Episode Thumbnail`);
    return response.json();
  }

  export async function editEpisodeContent(arg: {
    webtoonId: string;
    episodeId: string;
  }): Promise<any> {
    const { webtoonId, episodeId } = arg;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/webtoons/${webtoonId}/episode/${episodeId}/content`,
      {
        method: 'PUT',
        // body: JSON.stringify(arg),
      }
    );
    if (!response.ok) throw new Error(`Failed to post edit Episode Content`);
    return response.json();
  }
}
