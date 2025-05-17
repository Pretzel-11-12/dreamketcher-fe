export interface Folder {
  id: string;
  folderName: string;
  isPrivate: boolean;
  webtoons: Webtoon[];
  createdAt: string;
  updatedAt: string;
}

export interface Webtoon {
  id: string;
  title: string;
  thumbnail: string;
}
