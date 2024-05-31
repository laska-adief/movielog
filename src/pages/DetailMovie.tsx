import { useParams } from "react-router-dom";
import { DetailMovieProps, Genre, SpokenLanguage } from "../types/detailmovie";
import useWatchedMovieStore from "../store/useWatchedMovieStore";
import { useState } from "react";
import { MovieProps } from "../types/movie";
import { useQuery } from "react-query";
import { getDetailMovie } from "../services/MovieService";

const DetailMovie = () => {
  const { id } = useParams();
  const { watched_movies, setWatchedMovies } = useWatchedMovieStore();
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const [movie, setMovie] = useState<DetailMovieProps>();

  const { isLoading, isError } = useQuery({
    queryKey: ["getMovieDetail", id],
    queryFn: () => getDetailMovie(parseInt(id ? id : "0")),
    onSuccess: (data: DetailMovieProps) => {
      const findMovieWatched = watched_movies.find((wm: MovieProps) => wm.id === data?.id);
      setMovie({ ...data, is_watched: findMovieWatched?.is_watched ? true : false });
      setIsWatched(findMovieWatched?.is_watched ? true : false);
    },
  });

  const handleMarkAsWatched = () => {
    let newList: MovieProps[] = [];
    const movieWatched: MovieProps = {
      adult: movie?.adult || false,
      backdrop_path: movie?.backdrop_path || "",
      genre_ids: movie?.genres?.map((g: Genre) => g.id) || [],
      id: movie?.id || 0,
      original_language: movie?.original_language || "",
      original_title: movie?.original_title || "",
      overview: movie?.overview || "",
      popularity: movie?.popularity || 0,
      poster_path: movie?.poster_path || "",
      release_date: movie?.release_date || "",
      title: movie?.title || "",
      video: movie?.video || false,
      vote_average: movie?.vote_average || 0,
      vote_count: movie?.vote_count || 0,
      is_watched: true,
    };

    if (isWatched) {
      newList = watched_movies.filter((item: MovieProps) => item?.id !== movieWatched.id);
    } else {
      newList = [...watched_movies, movieWatched];
    }
    setIsWatched(!isWatched);
    setWatchedMovies(newList);
  };

  if (!isLoading && isError) {
    return <div className="flex items-center justify-center w-full h-40 font-medium text-lg">Data can't be loaded</div>;
  }

  return !isLoading && !isError ? (
    <div className="flex gap-6 flex-col items-center md:flex-row md:items-start">
      <div className="flex flex-col gap-4">
        <div className="min-w-52 h-full rounded-lg overflow-hidden">
          <img src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`} alt={movie?.title} className="w-full" />
        </div>
        <button
          type="button"
          className="py-2 px-4 bg-blue-500 outline-none border-none rounded-lg text-white font-medium hover:bg-blue-700 transition-all"
          onClick={handleMarkAsWatched}>
          {isWatched ? "Unmark as Watched" : "Mark as Watched"}
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">
          {movie?.title} - {`(${new Date(movie?.release_date ? movie?.release_date : "").getFullYear()})`}
        </h1>

        {movie?.genres?.length ? (
          <div className="flex gap-2 flex-wrap">
            {movie?.genres?.map((genre: Genre) => (
              <div className="py-1 px-2 rounded-full border border-blue-400 bg-blue-400 text-white">{genre?.name}</div>
            ))}
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center gap-2">
          <p className="font-medium text-lg">Status :</p>
          <span>{movie?.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-lg">Rating :</p>
          <span>{movie?.vote_average.toFixed(1)}</span>
        </div>
        <div>
          <h2 className="font-medium text-lg">Overview</h2>
          <p className="text-justify">{movie?.overview}</p>
        </div>
        {movie?.spoken_languages?.length ? (
          <div>
            <h2 className="font-medium text-lg">Spoken Languages</h2>
            <div className="flex items-center gap-2">
              {movie?.spoken_languages?.map((lang: SpokenLanguage) => (
                <p>{lang?.english_name}</p>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <LoadingDetail />
  );
};
export default DetailMovie;

export const LoadingDetail = () => (
  <div className="animate-pulse flex gap-6 flex-col items-center md:flex-row md:items-start">
    <div className="flex flex-col gap-4">
      <div className="bg-slate-700 w-52 h-72 rounded-lg"></div>
      <div className="bg-slate-700 w-52 h-10 rounded-lg"></div>
    </div>
    <div className="w-full flex flex-col gap-4">
      <div className="bg-slate-700 w-full h-8 rounded-lg"></div>
      <div className="flex gap-2 items-center">
        <div className="bg-slate-700 w-24 h-8 rounded-lg"></div>
        <div className="bg-slate-700 w-24 h-8 rounded-lg"></div>
        <div className="bg-slate-700 w-24 h-8 rounded-lg"></div>
      </div>
      <div className="bg-slate-700 w-40 h-6 rounded-lg"></div>
      <div className="bg-slate-700 w-40 h-6 rounded-lg"></div>
      <div className="bg-slate-700 w-40 h-6 rounded-lg"></div>
      <div className="bg-slate-700 w-full h-32 rounded-lg"></div>
      <div className="bg-slate-700 w-60 h-6 rounded-lg"></div>
      <div className="bg-slate-700 w-40 h-6 rounded-lg"></div>
    </div>
  </div>
);
