const timeConvertor = (s) => {
  return `${Math.floor(s / 3600)}ч ${Math.floor((s / 60) % 60)}м`;
};

export { timeConvertor };
