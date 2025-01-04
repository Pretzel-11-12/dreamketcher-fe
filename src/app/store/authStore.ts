import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  id: number | null;
  name: string | null;
  email: string | null;
  imageUri: string | null;
  setAccessToken: (token: string) => void;
  setUserInfo: (userInfo: {
    id: number;
    name: string;
    email: string;
    imageUri: string;
  }) => void;
  storeLogout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  id: null,
  name: null,
  email: null,
  imageUri: null,
  setAccessToken: (token) => set({ isLoggedIn: true, accessToken: token }),
  setUserInfo: ({ id, name, email, imageUri }) =>
    set({ id, name, email, imageUri }),
  storeLogout: () =>
    set({
      isLoggedIn: false,
      accessToken: null,
      id: null,
      name: null,
      email: null,
      imageUri: null,
    }),
}));

export default useAuthStore;
