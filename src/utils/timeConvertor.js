const timeConvertor = (m) => {
  return `${Math.floor(m / 60)}ч ${m % 60}м`;
};

export { timeConvertor };
