"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { checkTypes } from "../utils/functions";

export default function PokemonPage({
  searchParams,
}: {
  searchParams: { name: string };
}) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getPokemonDetail();
  }, []);

  const getPokemonDetail = () => {
    try {
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchParams.name}`)
        .then(({ data }) => setDetails(data));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("detalhe do pokemon", details);

  const types = details.types;

  return (
    <main>
      <Box display="flex" alignItems="center" gap={14} justifyContent="center">
        <Card sx={{ minWidth: 800 }}>
          <CardContent>
            <CardMedia
              sx={{ height: 600 }}
              image={details.sprites?.front_default}
              title={searchParams.name}
            />
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 800 }}>
          <CardContent>
            <CardMedia
              sx={{ height: 600 }}
              image={details.sprites?.back_default}
              title={searchParams.name}
            />
          </CardContent>
        </Card>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={14}
        justifyContent="center"
        marginTop="50px"
      >
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography className="font-semibold">
              Name: {searchParams.name}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography>Type: {checkTypes(types)}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography>Power Stats: {details.stats?.stat?.Name}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography>
              Abilities: {details.abilities?.ability?.name}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </main>
  );
}
