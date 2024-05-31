import { Bookmark } from "lucide-react";
import { MovieProps } from "../types/movie";
import { useEffect, useState } from "react";
import useWatchedMovieStore from "../store/useWatchedMovieStore";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }: { movie: MovieProps }) => {
  const { watched_movies, setWatchedMovies } = useWatchedMovieStore();
  const [isWatched, setIsWatched] = useState<boolean>(false);

  useEffect(() => {
    if (movie?.is_watched) {
      setIsWatched(true);
    } else {
      setIsWatched(false);
    }
  }, [movie, movie?.is_watched]);

  const handleMarkAsWatched = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    let newList: MovieProps[] = [];
    const movieWatched: MovieProps = { ...movie, is_watched: true };
    if (isWatched) {
      newList = watched_movies.filter((item: MovieProps) => item?.id !== movieWatched.id);
    } else {
      newList = [...watched_movies, movieWatched];
    }
    setIsWatched(!isWatched);
    setWatchedMovies(newList);
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-sm bg-white h-fill-available hover:bg-blue-100 transition-all">
      <Link to={`/movie/${movie.id}`}>
        <div className="m-h-[290px] overflow-hidden">
          <img src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`} alt={movie?.title} className="w-full" />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              <div className="bg-gray-800 text-yellow-400 rounded-lg py-1 px-2 text-sm font-medium">
                {new Date(movie.release_date).getFullYear()}
              </div>
              <div className="bg-gray-800 text-yellow-400 rounded-lg py-1 px-2 text-sm font-medium">{movie.vote_average.toFixed(1)}</div>
            </div>
            <div onClick={handleMarkAsWatched} className="cursor-pointer" title={isWatched ? "Mark as Not Watched" : "Mark as Watched"}>
              <Bookmark fill={isWatched ? "black" : "white"} />
            </div>
          </div>
          <div className="font-bold" title={movie?.title}>
            {movie?.title}
          </div>
        </div>
      </Link>
    </div>
  );
};
export default MovieCard;
