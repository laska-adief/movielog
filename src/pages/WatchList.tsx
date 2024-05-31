import MovieCard from "../components/MovieCard";
import useWatchedMovieStore from "../store/useWatchedMovieStore";
import { MovieProps } from "../types/movie";

const WatchList = () => {
  const { watched_movies } = useWatchedMovieStore();
  return watched_movies?.length ? (
    <div className="grid items-start justify-between grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-5 gap-4">
      {watched_movies?.map((movie: MovieProps) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-40 font-medium text-lg">You haven't watched any movies yet</div>
  );
};
export default WatchList;
