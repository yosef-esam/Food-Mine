import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
Search.defaultProps = {
  SearchRoute: "/search/",
  defaultRoute: "/",
  placeholder: "Search",
};
function Search({ SearchRoute, defaultRoute, placeholder }) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const search = () => {
    term ? navigate(SearchRoute + term) : navigate(defaultRoute);
  };

  useEffect(() => {
    setTerm(searchTerm ?? "");
  }, [searchTerm]);

  return (
    <label className="flex flex-col min-w-40 h-14 w-full">
      <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-lg">
        <div className="text-gray-500 flex border-none bg-white items-center justify-center pl-4 rounded-l-xl border-r-0" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 focus:outline-0 focus:ring-0 border-none bg-white focus:border-none h-full placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
          onChange={(e) => setTerm(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && search()}
          value={term}
        />
        <button 
          onClick={search}
          className="bg-orange-500 text-white px-6 rounded-r-xl hover:bg-orange-600 transition-colors duration-200 font-semibold"
        >
          Search
        </button>
      </div>
    </label>
  );
}

export default Search;
