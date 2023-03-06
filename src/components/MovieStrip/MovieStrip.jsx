import { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import API from "../../services/API";
import Movie from "../Movie/Movie";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const MovieStrip = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  // const { height, width } = useWindowDimensions();
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [movieSection, setMovieSection] = useState();

  const getAllMovies = async () => {
    try {
      const { data } = await API.get(
        `${props.request}&page=${searchParams.get("page")}&with_genres=''`
      );
      setMovies(() => {
        return data.results.map((movie, i) => {
          return <Movie key={movie.id} data={movie} pos={i} />;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchParams.get("page"))
      setSearchParams({
        page: 1,
      });
  }, []);

  useEffect(() => {
    getAllMovies();
  }, [searchParams]);

  useEffect(() => {
    if (movies.length <= 0) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
      let listMovies = movies.map((movie) => {
        return movie;
      });
      const slicedArray = listMovies.slice(0, 20);
      setMovieSection(slicedArray);
    }
  }, [movies]);

  function nextSet() {
    setSearchParams({
      page: Number(searchParams.get("page")) + 1,
    });
  }

  function prevSet() {
    if (searchParams.get("page") == 1) return;
    setSearchParams({
      page: Number(searchParams.get("page")) - 1,
    });
  }

  return (
    <>
      {isEnabled ? (
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="bg-neutral-800 rounded-lg text-neutral-100 p-2 flex items-center gap-1 w-[98%]">
            {props.icon}
            <p>{props.name}</p>
          </div>
          <div className="relative">
            <div className="flex gap-3 flex-wrap justify-center">
              {movieSection}
            </div>
            <motion.div
              className="absolute bg-neutral-800 cursor-pointer rounded p-3 top-[300px] left-[20px]"
              onClick={prevSet}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiChevronLeft size={25} className="text-neutral-100" />
            </motion.div>
            <motion.div
              className="absolute bg-neutral-800 cursor-pointer rounded p-3 top-[300px] right-[20px]"
              onClick={nextSet}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiChevronRight size={25} className="text-neutral-100" />
            </motion.div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MovieStrip;
