import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const visible = showSearch;

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate("/collection");
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="border-t border-b bg-gray-50 text-center">

      <form
        onSubmit={handleSearch}
        className="inline-flex items-center justify-center border border-blue-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2"
      >

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm"
          type="text"
          placeholder="Search"
          autoFocus
        />

        <button type="submit">
          <img
            className="w-4 cursor-pointer"
            src={assets.search_icon}
            alt="Search"
          />
        </button>

      </form>

      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.close_icon}
        alt="Close"
      />

    </div>
  );
};

export default SearchBar;
