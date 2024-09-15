import React, { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  filterPokemons?: (value: string) => void;
  handleFilterPowerLevel?: (value: string) => void;
  isSearchNav?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  filterPokemons,
  handleFilterPowerLevel,
  isSearchNav = true,
}) => {
  const [order, setOrder] = useState<string>("");

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(value);
    handleFilterPowerLevel && handleFilterPowerLevel(value);
  };

  return (
    <header className="bg-blue-500 p-4 shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {isSearchNav ? (
          <>
            <div className="relative">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                onChange={({ target: { value } }) =>
                  filterPokemons && filterPokemons(value)
                }
              />
            </div>
            <div className="ml-4 flex gap-4">
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
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Choose power level
                  </option>
                  <option value="desc">Lowest Power Level</option>
                  <option value="asc">Highest Power Level</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <button className="rounded-xl bg-white px-4 py-2 font-bold text-blue-500 shadow-md hover:bg-slate-200">
              <Link href="/">Go back</Link>
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
