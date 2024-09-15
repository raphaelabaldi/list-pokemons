export const checkTypes = (types) => {
  if (types[1]) {
    return types[0].type.name + " | " + types[1].type.name;
  }
  return types[0].type.name;
};

export const formatAbilities = (abilities) => {
  abilities.forEach((ability) => {
    ability.name;
  });
};
