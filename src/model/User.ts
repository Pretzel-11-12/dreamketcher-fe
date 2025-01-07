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
