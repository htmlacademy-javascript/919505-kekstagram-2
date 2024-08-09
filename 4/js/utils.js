export const getRandomIntegerFromRange = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomArrayElement = (array) => array[getRandomIntegerFromRange(0, array.length - 1)];

export const generateUniqueIDs = (min, max) => {
  const currentIDs = [];

  return () => {
    let newID = getRandomIntegerFromRange(min, max);

    if (currentIDs.length >= (max - min + 1)) {
      return null;
    }

    while (currentIDs.includes(newID)) {
      newID = getRandomIntegerFromRange(min, max);
    }

    currentIDs.push(newID);
    return newID;
  };
};
