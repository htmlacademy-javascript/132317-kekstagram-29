const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (items) =>
  items[getRandomInteger(0, items.length - 1)];

const createIdGenerator = () => {
  let lastGenetatedId = 0;

  return () => {
    lastGenetatedId += 1;
    return lastGenetatedId;
  };
};

export {getRandomInteger, getRandomArrayElement, createIdGenerator};
