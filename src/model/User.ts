export type User = {
  id: number;
  email?: string;
  businessEmail: string;
  name?: string;
  nickname: string;
  shortIntroduction: string;
  imageUrl: string;
  role?: 'MEMBER' | 'ADMIN';
};

export type UpdateUser = {
  id: number;
  businessEmail: string;
  nickname: string;
  shortIntroduction: string;
  imageUrl: string;
  isDeleteImage?: boolean;
}