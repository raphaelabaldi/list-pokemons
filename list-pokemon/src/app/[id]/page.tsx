"use client";

import React, { useEffect, useState } from "react";
import {
  checkTypes,
  formatAbilities,
  formatStats,
} from "@/app/utils/functions";
import { fetchData } from "@/app/tools/api";

export default function PokemonPage({
  searchParams,
}: {
  searchParams: { name: string };
}) {
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState<string[]>([]);
  const [stats, setStats] = useState<{ name: string; power: number }[]>([]);
  const [abilities, setAbilities] = useState<{ name: string }[]>([]);
  const [sprites, setSprites] = useState<{
    front_default: string;
    back_default: string;
  } | null>(null);

  console.log("name", searchParams.name);

  useEffect(() => {
    getPokemonDetail();
  }, []);

  useEffect(() => {
    console.log(abilities, "ABILITIES");
  }, [abilities]);

  const getPokemonDetail = async () => {
    try {
      const { types, stats, abilities, sprites } = await fetchData(
        `/${searchParams.name}`
      );

      setSprites(sprites);
      loadPokemonDetails(types, stats, abilities);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const loadPokemonDetails = (
    types: string[],
    stats: { name: string; power: number }[],
    abilities: { name: string }[]
  ) => {
    setTypes(checkTypes(types));
    setStats(formatStats(stats));
    setAbilities(formatAbilities(abilities));
  };

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section className="flex items-center gap-14 justify-center">
            <div className="min-w-800">
              <img
                className="h-600"
                src={sprites?.front_default}
                alt={searchParams.name}
              />
            </div>

            <div className="min-w-800">
              <img
                className="h-600"
                src={sprites?.back_default}
                alt={searchParams.name}
              />
            </div>
          </section>
          <section className="flex items-center gap-14 justify-center mt-50">
            <div className="min-w-300">
              <h2 className="font-semibold">Name: {searchParams.name}</h2>
            </div>

            <div className="min-w-300">
              <p>Type: {types}</p>
            </div>

            <div className="min-w-300">
              <div className="flex flex-col items-center w-full">
                <h3>Power Stats:</h3>
                {stats.map((stat, index) => (
                  <p key={index}>
                    {stat.name}: {stat.power}
                  </p>
                ))}
              </div>
            </div>

            <div className="min-w-300">
              <div>Abilities:</div>
              {abilities.map((ability, index) => (
                <p key={index}>{ability.name}</p>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
