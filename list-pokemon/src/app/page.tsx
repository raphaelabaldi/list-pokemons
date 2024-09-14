"use client";

import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/system";
import Navbar from "./components/navbar/page";
import PokemonCard from "./components/pokemonCard/page";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  let details = [];

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemons]);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=12"
      );

      const { results } = await response.json();

      setPokemons(results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPokemonDetails = async () => {
    try {
      const pokemonNames = pokemons.map((pokemon) => pokemon.name);

      pokemonNames.forEach(async (pokemonName) => {
        const pokemonDetails = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        const { name, abilities, sprites, stats, types } =
          await pokemonDetails.json();
        details.push([{ name, abilities, sprites, stats, types }]);

        return details;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <main>
        <Navbar />
        <div className="flex gap-5">
          <Container maxWidth="xl">
            <Grid container spacing={5}>
              {pokemons.map((pokemon, key) => (
                <Grid size={3} key={key}>
                  <PokemonCard details={details} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </main>
    </div>
  );
}
