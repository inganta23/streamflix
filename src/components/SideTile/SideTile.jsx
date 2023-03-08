import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addGenre, removeGenre } from "../../redux/genre/genreSlice";

export default function SideTile(props) {
  const [highlighted, setHighlighted] = useState(false);
  const dispatch = useDispatch();

  const toggleHighlighted = () => {
    setHighlighted(!highlighted);
    if (!highlighted) {
      dispatch(addGenre(props.genre.id));
    } else {
      dispatch(removeGenre(props.genre.id));
    }
  };

  const animations = {
    empty: {
      opacity: 0,
    },
    fadeIn: {
      opacity: 100,
      transition: { duration: 1 * props.pos },
    },
  };

  return (
    <motion.div
      variants={animations}
      initial="empty"
      animate="fadeIn"
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleHighlighted}
    >
      <li
        key={props.genre.id}
        id={props.genre.id}
        className={
          highlighted
            ? "p-3 bg-cyan-600 rounded-xl rounded-r-none duration-200 select-none"
            : "p-3 hover:bg-neutral-900 rounded-xl rounded-r-none duration-200 select-none"
        }
      >
        {props.genre.name}
      </li>
    </motion.div>
  );
}
