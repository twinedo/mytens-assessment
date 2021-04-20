export const randHexLight = () => {
  return (Math.floor(Math.random() * 56) + 200).toString(16);
};

export const randColorLight = () => {
  return randHexLight() + '' + randHexLight() + '' + randHexLight();
};
