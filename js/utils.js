const getRandomIntegerFromRange = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomElementsFromArray = (array, quantity) => {
  const result = [];

  for (let i = 0; i < quantity; i++) {
    let randomIndex = getRandomIntegerFromRange(0, array.length - 1);

    while (result.includes(array[randomIndex])) {
      randomIndex = getRandomIntegerFromRange(0, array.length - 1);
    }
    result.push(array[randomIndex]);
  }

  return result;
};
