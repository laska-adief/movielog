import axios from "axios";

const BASEURL = "https://api.themoviedb.org/3";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDVmNzE5MzU5ZTMyZWIxNGU5NjE5ZWI1ZDk0M2IzNSIsInN1YiI6IjYyM2I5YzYwYTMxNDQwMDA4OWQzMjZiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MoFDjZxR2QwrwbvuOz7YLOaLhF338QWZ3CE7nhl969A";

export const getMovies = async (query: string) => {
  console.log("query", query);
  console.log(`${BASEURL}/movie/popular${query ? "?" + query : ""}`);
  const { data } = await axios.get(`${BASEURL}/movie/popular${query ? "?" + query : ""}'`, {
    headers: {
      accept: "application/json",
      Authorization: TOKEN,
    },
  });
  return data;
};
