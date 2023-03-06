import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import SearchResults from "../SearchResults/SearchResults";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: toggleSearchOff,
  });
  const navigate = useNavigate();

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
      <div className="px-4 py-2 drop-shadow-xl flex bg-neutral-800 fixed top-0 z-40 w-screen">
        <div
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-16" alt="logo" />
        </div>
        <form className="relative flex w-1/2 items-center  ml-10" ref={ref}>
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
      <Outlet />
    </>
  );
};

export default Navbar;
