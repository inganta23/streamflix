import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CartList from "../components/Cart/Cart";
import { motion } from "framer-motion";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Cart = () => {
  const [slicedMovies, setSlicedMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const postPerPage = 5;
  const { movies } = useSelector((state) => state.purchasedMovies);

  function nextSet() {
    if (
      (Number(searchParams.get("page")) + 1) * postPerPage - 5 >=
      Object.keys(movies).length
    )
      return;
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

  useEffect(() => {
    if (!searchParams.get("page"))
      setSearchParams({
        page: 1,
      });
  }, []);

  useEffect(() => {
    const arrayOfMovies = Object.keys(movies);
    const page = searchParams.get("page");
    const firstIndex = (Number(page) - 1) * postPerPage;
    const lastIndex = Number(page) * postPerPage;
    const sliced = arrayOfMovies.slice(firstIndex, lastIndex);
    setSlicedMovies(sliced);
  }, [searchParams, movies]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative min-h-screen flex items-center justify-center lg:mt-0 sm:mt-24">
        <div className="flex gap-3 flex-wrap overflow-hidden px-8 justify-center mx-14">
          {slicedMovies.map((movieId) => (
            <CartList movieId={movieId} key={movieId} />
          ))}
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
  );
};

export default Cart;
