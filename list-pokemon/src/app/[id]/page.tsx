"use client";

import React, { useEffect, useState } from "react";
import {
  checkTypes,
  formatAbilities,
  formatStats,
} from "@/app/utils/functions";
import { fetchData } from "@/app/tools/api";
import Link from "next/link";
import Navbar from "@/app/components/navbar/page";

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
          <Navbar isSearchNav={false} />
          <div className="flex flex-col justify-center mt-40">
            <section className="flex flex-col items-center gap-14 justify-center">
              <div className="flex gap-4">
                <div className="bg-white rounded-md shadow-sm">
                  <img
                    className="h-100 w-60"
                    src={sprites?.front_default}
                    alt={searchParams.name}
                  />
                </div>
                <div className="bg-white rounded-md shadow-sm">
                  <img
                    className="h-100 w-60"
                    src={sprites?.back_default}
                    alt={searchParams.name}
                  />
                </div>
              </div>
            </section>
            <section className="flex items-start gap-14 justify-center text-justify bg-white rounded-md shadow-md h-fit w-fit mt-12 p-8">
              <div>
                <p className="bg-slate-200 rounded-md font-semibold text-center w-full">
                  Name
                </p>
                <p className="text-center"> {searchParams.name}</p>
              </div>

              <div>
                <p className="bg-slate-200 rounded-md text-center font-semibold w-full">
                  Type
                </p>
                <p className="text-center">{types}</p>
              </div>

              <div>
                <div className="flex flex-col items-center w-full">
                  <p className="bg-slate-200 rounded-md text-center font-semibold w-full">
                    Power Stats
                  </p>
                  <p className="text-center">
                    {stats.map((stat, index) => (
                      <p key={index}>
                        {stat.name}: {stat.power}
                      </p>
                    ))}
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-slate-200 rounded-md text-center font-semibold w-full">
                  Abilities
                </div>
                {abilities.map((ability, index) => (
                  <p className="text-center" key={index}>
                    {ability.name}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </main>
  );
}
