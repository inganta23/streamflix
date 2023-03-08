import React from "react";
import MovieStrip from "../MovieStrip/MovieStrip";
import { MdLocalMovies } from "react-icons/md";

const Content = () => {
  return (
    <div className="bg-dark-gray mb-8 ml-40 w-full">
      <MovieStrip
        name="Movies"
        icon={<MdLocalMovies size={20} color="#F21B3F" />}
        request={`/discover/movie?language=en-US&include_adult=false`}
      />
    </div>
  );
};

export default Content;
