"use client";

import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/system";
import Navbar from "./components/navbar/page";
import PokemonCard from "./components/pokemonCard/page";
import axios from "axios";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = () => {
    try {
      let endpoints = [];

      for (let i = 1; i < 49; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
      }

      const response = axios
        .all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then((res) => setPokemons(res));

      return response;
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
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setPokemons(filteredPokemons);
  };

  const filterPowerLevel = (pokemons, order = "desc") => {
    console.log("chegou");

    return [...pokemons].sort((a, b) => {
      if (order === "desc") {
        return a.data.stats[1].base_stat - b.data.stats[1].base_stat;
      } else {
        return b.data.stats[1].base_stat - a.data.stats[1].base_stat;
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
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {pokemons.map((pokemon, key) => (
              <Grid size={2} key={key}>
                <PokemonCard
                  name={pokemon.data.name}
                  image={pokemon.data.sprites.front_default}
                  power={pokemon.data.stats[1].base_stat}
                  types={pokemon.data.types}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </main>
  );
}
