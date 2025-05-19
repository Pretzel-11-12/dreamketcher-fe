import { Folder, Webtoon } from './model';
import { fetchAPI } from '..';

export const postBookShelfFolder = async (folderName: string): Promise<Folder> => {
  return fetchAPI({
    method: 'POST',
    endpoint: '/storage/folder',
    body: { folderName },
  })
};

export const deleteBookShelfFolder = async (folderId: string): Promise<void> => {
  return fetchAPI({
    method: 'DELETE',
    endpoint: `/storage/folder/${folderId}`,
  });
};

export const putBookShelfFolder = async (
  folderId: string,
  webtoonId: string
): Promise<Folder> => {
  return fetchAPI({
    method: 'PUT',
    endpoint: `/storage/folder/${folderId}`,
    body: { webtoonId },
  });
};

export const postWebtoonToBookShelf = async (
  folderId: string,
  webtoon: Webtoon
): Promise<void> => {
  return fetchAPI({
    method: 'POST',
    endpoint: `/storage/folder/${folderId}/content`,
    body: webtoon,
  });
};

export const deleteWebtoonFromBookShelf = async (
  folderId: string,
  webtoonId: string
): Promise<void> => {
  return fetchAPI({
    method: 'DELETE',
    endpoint: `/storage/folder/${folderId}/content/${webtoonId}`,
  });
};
