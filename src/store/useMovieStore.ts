import { create } from "zustand";
import { MovieProps } from "../types/movie";

interface MovieStoreProps {
  page: number;
  movies: MovieProps[];
  total_pages: number;
  setPage: (value: number) => void;
  setMovies: (values: MovieProps[]) => void;
  setTotalPages: (values: number) => void;
}

const useMovieStore = create<MovieStoreProps>((set) => ({
  page: 1,
  movies: [],
  total_pages: 0,
  setPage: (page: number) => set({ page }),
  setMovies: (movies: MovieProps[]) => set({ movies }),
  setTotalPages: (total_pages: number) => set({ total_pages }),
}));

export default useMovieStore;
