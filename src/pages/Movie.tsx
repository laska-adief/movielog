import { useQuery, useQueryClient } from "react-query";
import MovieCard from "../components/MovieCard";
import { MovieProps } from "../types/movie";
import { getMovies } from "../services/MovieService";
import LoadingCard from "../components/LoadingCard";
import useMovieStore from "../store/useMovieStore";
import useWatchedMovieStore from "../store/useWatchedMovieStore";
import { useEffect, useState } from "react";

const Movie = () => {
  const queryClient = useQueryClient();
  const { page, total_pages, movies, setPage, setTotalPages, setMovies } = useMovieStore();
  const { watched_movies } = useWatchedMovieStore();
  const [currPage, setCurrPage] = useState(1);

  const { isLoading, isError } = useQuery({
    queryKey: ["getMovies", currPage],
    queryFn: () => getMovies(`page=${currPage}`),
    onSuccess: (values) => {
      setPage(values?.page);
      setTotalPages(values?.total_pages);
      const dataMovies = values?.results?.map((movie: MovieProps) => {
        const isWatched = watched_movies.some((wm: MovieProps) => wm.id === movie.id);
        return { ...movie, is_watched: isWatched };
      });
      if (values?.page > 1) {
        setMovies([...movies, ...dataMovies]);
      } else {
        setMovies(dataMovies);
      }
    },
  });

  useEffect(() => {
    if (page !== currPage) {
      queryClient.invalidateQueries(["getMovies", currPage]);
    }
  }, [currPage, page, queryClient]);

  const handleLoadMore = () => {
    setCurrPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="grid items-start justify-between grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-5 gap-4">
        {!isError && movies?.length ? movies.map((movie: MovieProps, i: number) => <MovieCard key={movie.id + i} movie={movie} />) : <></>}
        {isLoading && Array.from({ length: 5 }).map((_, i: number) => <LoadingCard key={i} />)}
      </div>
      {!isLoading && movies?.length && page <= total_pages && (
        <div className="w-full text-center py-4">
          <button
            type="button"
            className="py-2 px-4 bg-blue-500 outline-none border-none rounded-lg text-white font-medium"
            onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
      {!isLoading && isError && (
        <div className="flex items-center justify-center w-full h-40 font-medium text-lg">Data can't be loaded</div>
      )}
    </>
  );
};
export default Movie;
