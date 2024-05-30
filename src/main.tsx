import React from 'react'
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import Movie from "./pages/Movie.tsx";
import WatchList from "./pages/WatchList.tsx";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect("/movies"),
      },
      {
        path: "movies",
        element: <Movie />,
      },
      {
        path: "watchlist",
        element: <WatchList />,
      },
      {
        path: "*",
        loader: () => redirect("/movies"),
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
