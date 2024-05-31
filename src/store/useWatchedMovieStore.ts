import { create } from "zustand";
import { MovieProps } from "../types/movie";
import { PersistOptions, persist } from "zustand/middleware";

interface WatchedMovieStoreProps {
  watched_movies: MovieProps[];
  setWatchedMovies: (values: MovieProps[]) => void;
}

const persistOptions: PersistOptions<WatchedMovieStoreProps> = {
  name: "movielog",
};

const useWatchedMovieStore = create(
  persist(
    (set) => ({
      watched_movies: [],
      setWatchedMovies: (watched_movies: MovieProps[]) => set({ watched_movies }),
    }),
    persistOptions
  )
);

export default useWatchedMovieStore;
