import { create } from "zustand";

interface GenreState {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const useGenreStore = create<GenreState>((set) => ({
  selectedGenre: "추천",
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
}));

export default useGenreStore;
