"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/page";
import PokemonCard from "./components/pokemonCard/page";
import axios from "axios";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      const endpoints = [];

      for (let i = 1; i < 49; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
      }

      const responses = await Promise.all(
        endpoints.map((endpoint) => axios.get(endpoint))
      );

      const pokemonData = responses.map((res) => res.data);

      setPokemons(pokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  const filterPokemons = (name) => {
    let filteredPokemons = [];

    if (name === "") {
      fetchPokemonDetails();
    }

    for (let i in pokemons) {
      if (pokemons[i].name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setPokemons(filteredPokemons);
  };

  const filterPowerLevel = (pokemons, order = "desc") => {
    return [...pokemons].sort((a, b) => {
      if (order === "desc") {
        return a.stats[1].base_stat - b.stats[1].base_stat;
      } else {
        return b.stats[1].base_stat - a.stats[1].base_stat;
      }
    });
  };

  const handleFilterPowerLevel = (order = "desc") => {
    const orderedPokemons = filterPowerLevel(pokemons, order);

    setPokemons(orderedPokemons);
  };

  return (
    <main>
      <Navbar
        filterPokemons={filterPokemons}
        handleFilterPowerLevel={handleFilterPowerLevel}
      />
      <div className="flex gap-5 margin-top m-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {pokemons.map((pokemon, key) => (
              <div key={key}>
                <PokemonCard
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                  power={pokemon.stats[1].base_stat}
                  types={pokemon.types}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
