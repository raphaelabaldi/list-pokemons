"use client";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import PokemonCard from "@/app/components/PokemonCard/PokemonCard";
import { fetchData } from "@/app/tools/api";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      const endpoints = [];

      for (let i = 1; i < 49; i++) {
        endpoints.push(`/${i}`);
      }

      const responses = await Promise.all(
        endpoints.map((endpoint) => fetchData(endpoint)),
      );

      setPokemons(responses);
    } catch (error) {
      console.error(error);
    }
  };

  const filterPokemons = (name: string) => {
    if (name === "") {
      fetchPokemonDetails();
      return;
    }

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.includes(name),
    );

    setPokemons(filteredPokemons);
  };

  const filterPowerLevel = (
    pokemons: Pokemon[],
    order: "asc" | "desc" = "desc",
  ) => {
    return [...pokemons].sort((a, b) => {
      if (order === "asc") {
        return b.stats[1].base_stat - a.stats[1].base_stat;
      } else {
        return a.stats[1].base_stat - b.stats[1].base_stat;
      }
    });
  };

  const handleFilterPowerLevel = (order: "asc" | "desc" = "desc") => {
    const orderedPokemons = filterPowerLevel(pokemons, order);
    setPokemons(orderedPokemons);
  };

  return (
    <main>
      <Navbar
        filterPokemons={filterPokemons}
        handleFilterPowerLevel={handleFilterPowerLevel}
      />
      <div className="flexflex-wrapjustify-center margin-top m-5 gap-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pokemons.map((pokemon, key) => (
              <div key={key} className="sm:w-1/2 md:w-full">
                <PokemonCard
                  name={pokemon?.name}
                  image={pokemon?.sprites?.front_default}
                  power={pokemon?.stats[1]?.base_stat}
                  types={pokemon?.types}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
