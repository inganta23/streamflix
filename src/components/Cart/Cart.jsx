import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { setPricing } from "../../utils/pricing";
import { useDispatch } from "react-redux";
import { incrementByAmount } from "../../redux/saldo/saldoSlice";
import { removeMovie } from "../../redux/purchasedMovies/purchasedMoviesSlice";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { useState } from "react";
import { useEffect } from "react";
import API from "../../services/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartList = (props) => {
  const [movie, setMovie] = useState();
  const year = movie?.release_date.split("-");
  const price = setPricing(movie?.vote_average);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const str = movie?.title;
  const slug = str?.replace(/\s+/g, "-").toLowerCase();

  const notify = (message, error = false) =>
    error ? toast.error(message) : toast.success(message);

  const getMovie = async () => {
    try {
      const { data } = await API.get(`/movie/${props.movieId}`);
      setMovie(data);
    } catch (error) {
      notify(error, true);
    }
  };

  const handleRefund = () => {
    dispatch(incrementByAmount(price));
    dispatch(removeMovie(movie?.id));
    notify("Refund Sukses");
  };

  useEffect(() => {
    getMovie();
  }, []);

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
      <motion.div
        className="inline-block flex-shrink-0 drop-shadow-lg bg-neutral-900 h-[410px] w-48 rounded-lg cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          className="w-fit rounded-lg rounded-b-none"
          src={`https://image.tmdb.org/t/p/w400${movie?.poster_path}`}
          alt="Couldn't find image"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
          }}
          onClick={() => navigate(`/${movie?.id}-${slug}`)}
        />
        <div className="p-2.5 space-y-1">
          <div className="flex gap-1 items-center">
            <AiFillStar size="14" color="#EAB308" />
            <p className="text-neutral-500 text-xs">
              {`${
                movie?.vote_average
              } • ${movie?.vote_count.toLocaleString()} votes • ${
                year?.length > 0 ? year[0] : "N/A"
              }`}
            </p>
          </div>
          <p className="text-neutral-100 text-sm line-clamp-1 pt-1">
            {movie?.title}
          </p>
          <div className="flex justify-between items-center pt-3">
            <p className="text-neutral-100 text-sm">
              Rp {currencyFormatter(price)}
            </p>

            <button
              className="px-4 py-1 font-semibold text-black border-b-4 rounded shadow-lg bg-gray-100 border-gray-200 shadow-gray-100/50 hover:border-gray-500 z-10"
              onClick={handleRefund}
            >
              Refund
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CartList;
