import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGE3NmY0MGU2NzAzMWQ1OGVkOTU2OTFmMWI0MjJhNCIsInN1YiI6IjY0MDVjYWE2ZTYxZTZkMDBkNTM0MGY1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VV7q0zl7rPrnb7I-Jb7eTTCj9GBpqLidjRCRnIL5yEY`;
    return config;
  },
  (error) => {
    console.log("REQUEST ERROR");
    return Promise.reject(error);
  }
);

export default instance;
