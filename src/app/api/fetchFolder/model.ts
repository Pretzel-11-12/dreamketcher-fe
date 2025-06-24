export interface Folder {
  folderId: string;
  folderName: string;
  isPrivate: boolean;
  items: Item[];
}

export interface Item {
  webtoonId: string;
  title: string;
  thumbnail: string;
  authorNickname: string;
}
