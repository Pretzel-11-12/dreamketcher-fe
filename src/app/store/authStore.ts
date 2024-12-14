import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  id: number | null;
  name: string | null;
  email: string | null;
  imageUrl: string | null;
  setAccessToken: (token: string) => void;
  setUserInfo: (userInfo: {
    id: number;
    name: string;
    email: string;
    imageUrl: string;
  }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  id: null,
  name: null,
  email: null,
  imageUrl: null,
  setAccessToken: (token) => set({ isLoggedIn: true, accessToken: token }),
  setUserInfo: ({ id, name, email, imageUrl }) =>
    set({ id, name, email, imageUrl }),
  logout: () =>
    set({
      isLoggedIn: false,
      accessToken: null,
      id: null,
      name: null,
      email: null,
      imageUrl: null,
    }),
}));

export default useAuthStore;
