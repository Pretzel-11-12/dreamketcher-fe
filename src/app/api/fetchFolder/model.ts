export interface Folder {
  folderId: string;
  folderName: string;
  isPrivate: boolean;
  // webtoons: Webtoon[];
}

export interface Webtoon {
  id: string;
  title: string;
  thumbnail: string;
}
