import React, { useState } from "react";

interface NavbarProps {
  filterPokemons: (value: string) => void;
  handleFilterPowerLevel: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  filterPokemons,
  handleFilterPowerLevel,
}) => {
  const [order, setOrder] = useState<string>("");

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(value);
    handleFilterPowerLevel(value);
  };

  return (
    <header className="bg-blue-500 p-4 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            id="search"
            type="text"
            placeholder="Search…"
            aria-label="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={({ target: { value } }) => filterPokemons(value)}
          />
        </div>
        <div className="flex gap-4 ml-4">
          <div className="relative">
            <label
              htmlFor="pokemon-filter"
              className="block text-sm font-medium text-white"
            >
              Filter by power level
            </label>
            <select
              id="pokemon-filter"
              value={order}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>
                Choose power level
              </option>
              <option value="desc">Lowest Power Level</option>
              <option value="asc">Highest Power Level</option>
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
