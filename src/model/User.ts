export type User = {
  id: number;
  email: string;
  name: string;
  imageUri: string;
  role: 'MEMBER' | 'ADMIN';
};
