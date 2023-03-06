import { useState, useEffect } from "react";
import API from "../../services/API";
import SearchMovieTile from "../SearchMovieTile/SearchMovieTile";
import { motion } from "framer-motion";

const SearchResults = (props) => {
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState(false);

  const getSearchedMovies = async () => {
    try {
      const { data } = await API.get(
        `/search/movie?language=en-US&include_adult=false&query=${props.search}`
      );
      const newMovies = data.results.slice(0, 5);
      setMovies((results) => {
        return newMovies.map((movie, i) => {
          if (movie.release_date === undefined) return null;
          return <SearchMovieTile movie={movie} key={movie.id} />;
        });
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (props.search.length === 0) return;
    getSearchedMovies();
  }, [props.search]);

  useEffect(() => {
    if (props.search.length === 0) {
      setResults(false);
    } else if (!props.search.isEmpty && movies.length === 0) {
      setResults(false);
    } else {
      setResults(true);
    }
  }, [movies]);

  return (
    <motion.div
      className="absolute top-12 w-full"
      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
    >
      {results ? (
        <div className="bg-neutral-800 rounded drop-shadow-xl border-neutral-700 border-[1px]">
          {movies}
        </div>
      ) : (
        <p className="bg-neutral-800 rounded drop-shadow-xl border-neutral-700 border-[1px] text-neutral-100 p-2">
          Nothing found
        </p>
      )}
    </motion.div>
  );
};

export default SearchResults;
