import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  id: number | null;
  nickname: string | null;
  businessEmail: string | null;
  imageUrl: string | null;
  shortIntroduction: string | null;
  setAccessToken: (token: string) => void;
  setUserInfo: (userInfo: {
    id: number;
    nickname: string;
    businessEmail: string;
    imageUrl: string;
    shortIntroduction: string;
  }) => void;
  storeLogout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  id: null,
  nickname: null,
  businessEmail: null,
  imageUrl: null,
  shortIntroduction: null,
  setAccessToken: (token) => set({ isLoggedIn: true, accessToken: token }),
  setUserInfo: ({ id, nickname, businessEmail, imageUrl, shortIntroduction }) =>
    set({ id, nickname, businessEmail, imageUrl, shortIntroduction }),
  storeLogout: () =>
    set({
      isLoggedIn: false,
      accessToken: null,
      id: null,
      nickname: null,
      businessEmail: null,
      imageUrl: null,
      shortIntroduction: null,
    }),
}));

export default useAuthStore;
