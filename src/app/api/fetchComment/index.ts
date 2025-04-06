import { fetchAPI } from '..';
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

    const queryString = query ? `?${qs.stringify(query)}` : '';

    return fetchAPI({
      method: 'GET',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments${queryString}`,
    }) as Promise<{ result: Model.ResCommentUnit[]; totalElements: number }>;
  }

  export async function getReComments(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      commentId: number;
    };
    query: {
      page: number;
      size: number;
      order: 'DESC' | 'ASC';
    };
  }): Promise<{ result: Model.ResReCommentUnit[]; totalElements: number }> {
    const { param, query } = arg;
    const { webtoonId, episodeId, commentId } = param;

    const queryString = arg.query ? `?${qs.stringify(query)}` : '';

    return fetchAPI({
      method: 'GET',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recomments${queryString}`,
    }) as Promise<{ result: Model.ResReCommentUnit[]; totalElements: number }>;
  }

  export async function getMyComments(arg: {
    query: {
      page: number;
      size: number;
      order: 'DESC' | 'ASC';
    };
  }): Promise<{ result: Model.ResMyCommentsUnit[]; totalElements: number }> {
    const { query } = arg;
    const queryString = query ? `?${qs.stringify(query)}` : '';

    return fetchAPI({
      method: 'GET',
      endpoint: `/member/comments-and-recomments${queryString}`,
    }) as Promise<{ result: Model.ResMyCommentsUnit[]; totalElements: number }>;
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

    return fetchAPI({
      method: 'POST',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/create`,
      body: { content },
    });
  }

  export async function postReComment(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
      content: string;
    };
  }): Promise<{ id: number }> {
    const { param } = arg;
    const { webtoonId, episodeId, content, commentId } = param;

    return fetchAPI({
      method: 'POST',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recomment/create`,
      body: { content },
    });
  }

  export async function deleteComment(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
    };
  }): Promise<{ id: number } | null> {
    const { param } = arg;
    const { webtoonId, episodeId, commentId } = param;

    try {
      return await fetchAPI({
        method: 'DELETE',
        endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/delete`,
      });
    } catch (error: any) {
      console.error('댓글 삭제 중 오류 발생:', error);
      throw error;
    }
  }

  export async function deleteReComment(arg: {
    param: {
      webtoonId: string;
      episodeId: string;
      commentId: string;
      recommentId: string;
    };
  }): Promise<{ id: number } | null> {
    const { param } = arg;
    const { webtoonId, episodeId, commentId, recommentId } = param;

    try {
      return await fetchAPI({
        method: 'DELETE',
        endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recomment/${recommentId}/delete`,
      });
    } catch (error: any) {
      console.error('대댓글 삭제 중 오류 발생:', error);
      throw error;
    }
  }

  // 댓글 추천
  export const recommendComment = async (
    webtoonId: string,
    episodeId: string,
    commentId: string
  ) => {
    return fetchAPI({
      method: 'POST',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recommend`,
    });
  };

  // 댓글 추천 취소
  export const deleteRecommendComment = async (
    webtoonId: string,
    episodeId: string,
    commentId: string
  ) => {
    return fetchAPI({
      method: 'DELETE',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recommend`,
    });
  };

  // 댓글 비추천
  export const notRecommendComment = async (
    webtoonId: string,
    episodeId: string,
    commentId: string
  ) => {
    return fetchAPI({
      method: 'POST',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/not-recommend`,
    });
  };

  // 댓글 비추천 취소
  export const deleteNotRecommendComment = async (
    webtoonId: string,
    episodeId: string,
    commentId: string
  ) => {
    return fetchAPI({
      method: 'DELETE',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/not-recommend`,
    });
  };

  // 대댓글 추천
  export const recommendReComment = async (
    webtoonId: string,
    episodeId: string,
    commentId: string,
    recommentId: string
  ) => {
    return fetchAPI({
      method: 'POST',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recomment/${recommentId}/recommend`,
    });
  };

  // 대댓글 추천 취소
  export const deleteRecommendReComment = async (
    webtoonId: string,
    episodeId: string,
    commentId: string,
    recommentId: string
  ) => {
    return fetchAPI({
      method: 'DELETE',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recomment/${recommentId}/recommend`,
    });
  };

  // 대댓글 비추천
  export const notRecommendReComment = async (
    webtoonId: string,
    episodeId: string,
    commentId: string,
    recommentId: string
  ) => {
    return fetchAPI({
      method: 'POST',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recomment/${recommentId}/not-recommend`,
    });
  };

  // 대댓글 비추천 취소
  export const deleteNotRecommendReComment = async (
    webtoonId: string,
    episodeId: string,
    commentId: string,
    recommentId: string
  ) => {
    return fetchAPI({
      method: 'DELETE',
      endpoint: `/webtoons/${webtoonId}/episode/${episodeId}/comments/${commentId}/recomment/${recommentId}/not-recommend`,
    });
  };

  // 댓글/대댓글 추천,비추천 상태관리
  // export async function getCommend(): Promise<{
  //   result: Model.ResCommendUnit[];
  // }> {
  //   return fetchAPI({
  //     method: 'GET',
  //     endpoint: `/webtoons/commend`,
  //   }) as Promise<{ result: Model.ResCommendUnit[] }>;
  // }
}
