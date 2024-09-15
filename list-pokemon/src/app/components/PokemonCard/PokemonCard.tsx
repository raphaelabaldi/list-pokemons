import Link from "next/link";
import { checkTypes } from "@/app/utils/functions";

interface PokemonCardProps {
  name: string;
  image: string;
  power: number;
  types: string[];
}

export default function PokemonCard({
  name,
  image,
  power,
  types,
}: PokemonCardProps) {
  const pokemonNameURL = `/${name}`;

  return (
    <div className="max-w-xs overflow-hidden rounded-xl bg-white shadow-md">
      <img className="h-100 mx-auto w-60 object-cover" src={image} alt={name} />
      <div className="p-4">
        <div className="flex flex-col items-center justify-between">
          <h5 className="text-xl font-bold">{name}</h5>
          <p className="text-sm text-gray-500">{checkTypes(types)}</p>
        </div>
        <p className="text-sm text-gray-500">Power Level: {power}</p>
      </div>
      <div className="flex items-center justify-center p-4">
        <button className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700">
          <Link
            href={{
              pathname: `/pages/${pokemonNameURL}`,
              query: { name: name },
            }}
          >
            stats
          </Link>
        </button>
      </div>
    </div>
  );
}
