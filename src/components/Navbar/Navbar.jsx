import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Outlet } from "react-router-dom";
import { FcCurrencyExchange } from "react-icons/fc";
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import SearchResults from "../SearchResults/SearchResults";
import { useSelector } from "react-redux";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: toggleSearchOff,
  });
  const navigate = useNavigate();
  const { saldo } = useSelector((state) => state.saldo);
  const { movies } = useSelector((state) => state.purchasedMovies);

  function handleSetSearch(event) {
    setSearch(event.target.value);
  }

  function toggleSearchOn() {
    setShowSearch(true);
  }

  function toggleSearchOff() {
    setShowSearch(false);
  }

  return (
    <>
      <div className="px-4 py-2 drop-shadow-xl flex justify-between items-center bg-neutral-800 fixed top-0 z-40 w-screen">
        <div className="flex w-[50%]">
          <div className="cursor-pointer" onClick={() => navigate("/?page=1")}>
            <img src={logo} className="h-16" alt="logo" />
          </div>
          <form
            className="relative flex sm:w-3/4 lg:w-1/2 items-center  ml-10"
            ref={ref}
          >
            <input
              type="text"
              id="simple-search"
              className="bg-neutral-800 border border-neutral-700 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full h-10"
              placeholder="Search..."
              value={search}
              onChange={handleSetSearch}
              onMouseDown={toggleSearchOn}
            />
            {showSearch && <SearchResults search={search} />}
          </form>
        </div>
        <div className="flex gap-4 mr-4">
          <Link
            to="/cart?page=1"
            className="px-3 py-2 font-semibold text-white border-b-4 rounded shadow-lg bg-blue-500 border-blue-800 shadow-blue-600/50 hover:bg-blue-600 cursor-pointer flex gap-2"
          >
            <FaOpencart size={25} />
            <h1 className="font-bold">{Object.keys(movies).length}</h1>
          </Link>
          <div className="px-3 py-2 font-semibold text-white border-b-4 rounded shadow-lg bg-cyan-500 border-cyan-800 shadow-cyan-600/50 hover:bg-cyan-600 flex gap-2">
            <FcCurrencyExchange size={25} />
            <h1 className="text-white tracking-wide font-bold">
              Rp {currencyFormatter(saldo)}
            </h1>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
