import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    if (!query.trim()) return;

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}`
    );
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎬 Movie Explorer
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="px-4 py-2 w-150 rounded-l-md text-white focus:outline-white-1"
        />
        <button
          onClick={fetchMovies}
          className="bg-green-500 px-4 py-2 rounded-r-md hover:bg-green-700"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 rounded-xl p-3 shadow hover:scale-105 transition"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
                className="rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p className="text-sm text-gray-400">{movie.Year}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No movies found. Try searching something.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
