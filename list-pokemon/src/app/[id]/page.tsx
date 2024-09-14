"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function PokemonPage({ searchParams }) {
  const pokemonDetail = async () => {
    try {
      const details = axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchParams.name}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  pokemonDetail();

  return (
    <main>
      <Box display="flex" alignItems="center">
        <Card sx={{ minWidth: 800 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Front Image Pokemon
            </Typography>
            <CardMedia
              sx={{ height: 600 }}
              // image={pokemonDetail.sprites.front_default}
              title={name}
            />
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 800 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Back Image Pokemon
            </Typography>
            <CardMedia
              sx={{ height: 180 }}
              // image={pokemonDetail.sprites.back_default}
              title={name}
            />
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Typography className="font-semibold">
          Name: {name}
          {/* Type: {pokemonDetail.types}
          Abilities: {pokemonDetail.abilities} */}
        </Typography>
      </Box>
    </main>
  );
}
