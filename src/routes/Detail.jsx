import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlinePlayCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { TbRotate360 } from "react-icons/tb";
import { motion, useAnimationControls } from "framer-motion";
import MovieProvider from "../components/MovieProvider/MovieProvider";
import API from "../services/API";

const Detail = () => {
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState();
  const [cast, setCast] = useState();
  const [runtime, setRuntime] = useState(0);
  const [watchProviders, setWatchProviders] = useState([]);
  const { movieId } = useParams();
  const controls = useAnimationControls();

  const getMovieDetails = async () => {
    try {
      const { data } = await API.get(`/movie/${movieId}`);
      setMovie(data);
      setGenres(
        data.genres.map((genre, i) => {
          return `${genre.name}${data.genres.length > ++i ? "," : ""}`;
        })
      );
      setRuntime(
        data.runtime
          ? `${Math.floor(data.runtime / 60)}hr ${data.runtime % 60}m`
          : null
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getWatchProviders = async () => {
    try {
      const { data } = await API.get(`/movie/${movieId}/watch/providers`);
      const allProviders = data.results.US.flatrate;
      if (allProviders) {
        setWatchProviders(
          allProviders.map((movieProvider) => (
            <MovieProvider
              key={movieProvider.provider_id}
              movieProvider={movieProvider}
            />
          ))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getTrailer = async () => {
    const { data } = await API.get(`/movie/${movieId}/videos`);
    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].type === "Trailer") {
        openInNewTab(`https://www.youtube.com/watch?v=${data.results[i].key}`);
        break;
      }
    }
    data.results.map((video) => {
      if (video.type === "Trailer") return video;
    });
  };

  useEffect(() => {
    getMovieDetails();
    getWatchProviders();
  }, []);
  //bg-neutral-800 rounded-xl text-neutral-100 w-[700px] h-96 drop-shadow-2xl mx-auto

  return (
    <motion.div className="h-auto m-28">
      <div className="w-fit mx-auto px-8 py-16 flex flex-col items-center justify-center bg-neutral-800 rounded-xl drop-shadow-2xl">
        <div
          className="relative flex-shrink-0 cursor-pointer"
          onClick={getTrailer}
        >
          <img
            className="rounded-l-xl w-96"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt="Couldn't find image"
          />
          <div className="absolute top-0 w-full h-full bg-neutral-900 opacity-0 hover:opacity-30 duration-300 flex items-center justify-center active:opacity-50">
            <AiOutlinePlayCircle size={64} />
          </div>
        </div>

        <div className="flex flex-col max-w-[1200px] gap-6 mt-4">
          <h1 className="text-3xl ">{movie.title}</h1>
          <div className="flex items-center gap-1">
            <AiFillStar size="14" color="#EAB308" />
            <h4 className="text-sm text-neutral-500">
              {movie.vote_average} • {movie.vote_count} votes •{" "}
              {movie.release_date}
            </h4>
          </div>
          <div className="space-y-2 text-base">
            <h4 className="text-neutral-300 line-clamp-5">
              <strong>Overview: </strong>
              {movie.overview}
            </h4>
            <h4 className="text-neutral-300 line-clamp-1">
              <strong>Genres: </strong>
              {genres}
            </h4>
            {runtime && (
              <h4 className="text-neutral-300 line-clamp-1">
                <strong>Runtime: </strong>
                {runtime}
              </h4>
            )}
            {watchProviders.length > 0 && (
              <div className="flex flex-col gap-1.5 ">
                <h4 className="text-sm text-neutral-300 line-clamp-6">
                  <strong>Watch Providers: </strong>
                </h4>
                <div className="flex ">{watchProviders}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Detail;
