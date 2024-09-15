"use client";
import React, { useEffect, useState } from "react";
import {
  checkTypes,
  formatAbilities,
  formatStats,
} from "@/app/utils/functions";
import { fetchData } from "@/app/tools/api";
import Navbar from "@/app/components/Navbar/Navbar";

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

  useEffect(() => {}, [abilities]);

  const getPokemonDetail = async () => {
    try {
      const { types, stats, abilities, sprites } = await fetchData(
        `/${searchParams.name}`,
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
    abilities: { name: string }[],
  ) => {
    setTypes(checkTypes(types));
    setStats(formatStats(stats));
    setAbilities(formatAbilities(abilities));
  };

  return (
    <main>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <>
          <Navbar isSearchNav={false} />
          <div className="mt-5 flex flex-col justify-center md:mt-40">
            <section className="flex flex-col items-center justify-center gap-14">
              <div className="flex gap-4 md:w-full md:flex-row">
                <div className="rounded-md bg-white shadow-sm">
                  <img
                    className="h-100 w-60 md:w-[310px]"
                    src={sprites?.front_default}
                    alt={searchParams.name}
                  />
                </div>
                <div className="rounded-md bg-white shadow-sm">
                  <img
                    className="h-100 w-60 md:w-[310px]"
                    src={sprites?.back_default}
                    alt={searchParams.name}
                  />
                </div>
              </div>
            </section>
            <section className="mt-12 flex h-fit w-full flex-wrap items-start justify-between gap-4 rounded-md bg-white p-8 text-justify shadow-md md:w-fit md:flex-row md:justify-center md:gap-14">
              <div className="w-2/5">
                <p className="w-full rounded-md bg-slate-200 text-center font-semibold">
                  Name
                </p>
                <p className="text-center"> {searchParams.name}</p>
              </div>

              <div className="w-2/5">
                <p className="w-full rounded-md bg-slate-200 text-center font-semibold">
                  Type
                </p>
                <p className="text-center">{types}</p>
              </div>

              <div className="w-2/5">
                <div className="flex w-full flex-col items-center">
                  <p className="w-full rounded-md bg-slate-200 text-center font-semibold">
                    Power Stats
                  </p>
                  <div className="text-center">
                    {stats.map((stat, index) => (
                      <p key={index}>
                        {stat.name}: {stat.power}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-2/5">
                <div className="w-full rounded-md bg-slate-200 text-center font-semibold">
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
