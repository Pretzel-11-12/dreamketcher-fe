import { Folder } from './model';
import { fetchAPI } from '..';
import { FavoriteWebtoon } from '@/model/Webtoon';

export const postBookShelfFolder = async (folderName: string): Promise<Folder> => {
  return fetchAPI({
    method: 'POST',
    endpoint: '/storage/folder',
    body: { folderName },
  })
};

export const getBookShelfFolder = async (): Promise<Folder[]> => {
  return await fetchAPI({
    method: 'GET',
    endpoint: '/storage/folder',
  });
};

export const deleteBookShelfFolder = async (folderId: string): Promise<void> => {
  return fetchAPI({
    method: 'DELETE',
    endpoint: `/storage/folder/${folderId}`,
  });
};

export const putBookShelfFolder = async (
  folderId: string,
  webtoonId: number
): Promise<Folder> => {
  return fetchAPI({
    method: 'PUT',
    endpoint: `/storage/folder/${folderId}`,
    body: { webtoonId },
  });
};

export const postWebtoonToBookShelf = async (
  folderId: string,
  webtoonId: number
): Promise<void> => {
  return fetchAPI({
    method: 'POST',
    endpoint: `/storage/folder/${folderId}/content`,
    body: { webtoonId },
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

export const getBookShelfContent = async (
  folderId: any
): Promise<FavoriteWebtoon> => {
  return await fetchAPI({
    method: 'GET',
    endpoint: `/storage/folder/${folderId}/content`,
  });
};
