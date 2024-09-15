"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonPage({ searchParams }) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getPokemonDetail();
  }, []);

  const getPokemonDetail = () => {
    try {
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchParams.name}`)
        .then((res) => setDetails(res));
    } catch (error) {
      console.log(error);
    }
  };

  console.log("detalhe do pokemon", details.data);

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
              image={details.data.sprites.front_default}
              title={searchParams.name}
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
              image={details.data.sprites.back_default}
              title={searchParams.name}
            />
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Typography className="font-semibold">
          Name: {searchParams.name}
          {/* Type: {pokemonDetail.types}
          Abilities: {pokemonDetail.abilities} */}
        </Typography>
      </Box>
    </main>
  );
}
