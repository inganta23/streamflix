import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { setPricing } from "../../utils/pricing";
import { useDispatch, useSelector } from "react-redux";
import { decrementByAmount } from "../../redux/saldo/saldoSlice";
import { addMovie } from "../../redux/purchasedMovies/purchasedMoviesSlice";
import { currencyFormatter } from "../../utils/currencyFormatter";

const Movie = (props) => {
  const year = props.data.release_date.split("-");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.purchasedMovies);
  const { saldo } = useSelector((state) => state.saldo);
  const price = setPricing(props.data.vote_average);
  const str = props.data.title;
  const slug = str.replace(/\s+/g, "-").toLowerCase();

  const handleBuyMovie = () => {
    if (saldo < price) {
      props.notify("Saldo Tidak Cukup", true);
      return;
    }
    dispatch(decrementByAmount(price));
    dispatch(addMovie(props.data.id));
    props.notify("Pembelian Sukses");
  };

  return (
    <motion.div
      className="inline-block flex-shrink-0 drop-shadow-lg bg-neutral-900 h-[410px] w-48 rounded-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        className="w-fit rounded-lg rounded-b-none"
        src={`https://image.tmdb.org/t/p/w400${props.data.poster_path}`}
        alt="Couldn't find image"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
        }}
        onClick={() => navigate(`/${props.data.id}-${slug}`)}
      />
      <div className="p-2.5 space-y-1">
        <div className="flex gap-1 items-center">
          <AiFillStar size="14" color="#EAB308" />
          <p className="text-neutral-500 text-xs">
            {`${
              props.data.vote_average
            } • ${props.data.vote_count.toLocaleString()} votes • ${
              year[0] || "N/A"
            }`}
          </p>
        </div>
        <p className="text-neutral-100 text-sm line-clamp-1 pt-1">
          {props.data.title}
        </p>
        <div className="flex justify-between items-center pt-3">
          <p className="text-neutral-100 text-sm">
            Rp {currencyFormatter(price)}
          </p>
          {movies[props.data.id] ? (
            <button className="px-1 font-semibold text-black border-b-4 rounded shadow-lg bg-gray-100 border-gray-200 shadow-gray-100/50">
              Sudah Dibeli
            </button>
          ) : (
            <button
              className="px-4 py-1 font-semibold text-white border-b-4 rounded shadow-lg bg-green-500 border-green-800 shadow-green-600/50 hover:bg-green-600 cursor-pointer z-10"
              onClick={handleBuyMovie}
            >
              Beli
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Movie;
