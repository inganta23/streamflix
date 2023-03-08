import React from "react";
import MovieStrip from "../MovieStrip/MovieStrip";
import { BiTrendingUp } from "react-icons/bi";

const Content = () => {
  return (
    <div className="bg-dark-gray mt-3 mb-8 w-full">
      <MovieStrip
        name="Popular"
        icon={<BiTrendingUp size={20} color="#F21B3F" />}
        request={`/discover/movie?language=en-US&include_adult=false&sort_by=popularity.desc`}
      />
    </div>
  );
};

export default Content;
