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
    <div className="max-w-xs bg-white shadow-md rounded-xl overflow-hidden">
      <img className="h-48 w-full object-cover" src={image} alt={name} />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold">{name}</h5>
          <p className="text-sm text-gray-500">{checkTypes(types)}</p>
        </div>
        <p className="text-sm text-gray-500">Power Level: {power}</p>
      </div>
      <div className="flex items-center justify-center p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-md">
          <Link href={{ pathname: `${pokemonNameURL}`, query: { name: name } }}>
            stats
          </Link>
        </button>
      </div>
    </div>
  );
}
