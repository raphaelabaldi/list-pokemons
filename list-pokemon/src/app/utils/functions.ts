interface Type {
  type: {
    name: string;
  };
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Ability {
  ability: {
    name: string;
  };
}

export const checkTypes = (types: Type[]): string => {
  if (types[1]) {
    return types[0].type.name + " | " + types[1].type.name;
  }
  return types[0].type.name;
};

export const formatStats = (
  stats: Stat[],
): { power: number; name: string }[] => {
  let formattedStats: { power: number; name: string }[] = [];

  stats.forEach((stat) => {
    formattedStats.push({ power: stat.base_stat, name: stat.stat.name });
  });

  return formattedStats;
};

export const formatAbilities = (abilities: Ability[]): { name: string }[] => {
  let formattedAbilities: { name: string }[] = [];

  abilities.forEach((ability) => {
    formattedAbilities.push({ name: ability.ability.name });
  });

  return formattedAbilities;
};
