export const checkTypes = (types) => {
  if (types[1]) {
    return types[0].type.name + " | " + types[1].type.name;
  }
  return types[0].type.name;
};

export const formatStats = (stats) => {
  let formatedStats = [];

  stats.forEach((stat) => {
    formatedStats.push({ power: stat.base_stat, name: stat.stat.name });
  });

  return formatedStats;
};

export const formatAbilities = (abilities) => {
  console.log("ABILITIES NO FORMAT", abilities);
  let formatedAbilities = [];

  abilities.forEach((ability) => {
    formatedAbilities.push({ name: ability.ability.name });
  });

  console.log("formated", formatedAbilities);
  return formatedAbilities;
};
