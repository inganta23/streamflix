import { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import API from "../../services/API";
import Movie from "../Movie/Movie";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieStrip = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieSection, setMovieSection] = useState();
  const [enteredPage, setEnteredPage] = useState(1);

  const { genres } = useSelector((state) => state.genre);

  const notify = (message, error = false) =>
    error ? toast.error(message) : toast.success(message);
  const getAllMovies = async () => {
    try {
      const { data } = await API.get(
        `${props.request}&page=${searchParams.get(
          "page"
        )}&with_genres=${genres.toString()}`
      );
      setMovies(() => {
        return data.results.map((movie, i) => {
          return <Movie key={movie.id} data={movie} pos={i} notify={notify} />;
        });
      });
    } catch (error) {
      notify(error, true);
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
  }, [searchParams, genres]);

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isEnabled ? (
        <div className="flex flex-col justify-center items-center gap-3 mt-4">
          <div className="bg-neutral-800 rounded-lg text-neutral-100 p-2 flex items-center gap-1 w-[98%]">
            {props.icon}
            <p>{props.name}</p>
          </div>
          <div className="relative">
            <motion.div
              className="bg-neutral-800 cursor-pointer rounded p-3 w-28 md:w-fit ml-10 my-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-2 flex md:flex-row flex-col gap-2 items-center">
                <label htmlFor="pageTo">Enter page: </label>
                <input
                  name="pageTo"
                  value={enteredPage}
                  className="outline-none px-1 md:w-36 sm:w-10 w-4"
                  onChange={(e) => setEnteredPage(e.target.value)}
                  type="number"
                />
                <button
                  className="px-2 font-semibold text-white border-b-4 rounded shadow-lg bg-cyan-500 border-cyan-800 shadow-cyan-600/50 hover:bg-cyan-600"
                  onClick={() =>
                    setSearchParams({
                      page: Number(enteredPage),
                    })
                  }
                >
                  Go
                </button>
              </div>
              <label>Max Page: 500</label>
            </motion.div>
            <div className="flex gap-3 flex-wrap justify-center overflow-hidden px-8">
              {movieSection}
            </div>
            <motion.div
              className="fixed bg-neutral-800 cursor-pointer rounded p-3 top-[450px] left-[160px]"
              onClick={prevSet}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiChevronLeft size={25} className="text-neutral-100" />
            </motion.div>
            <motion.div
              className="fixed bg-neutral-800 cursor-pointer rounded p-3 top-[450px] right-[20px]"
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
