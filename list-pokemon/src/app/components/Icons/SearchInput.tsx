import React from "react";
import { Search } from "lucide-react";

const SearchInput = ({ onChange }) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        onChange={onChange}
        className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        placeholder="Search..."
        aria-label="Search"
      />
    </div>
  );
};

export default SearchInput;
