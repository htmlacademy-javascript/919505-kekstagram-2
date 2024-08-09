import {photoMockData} from './mocks.js';
import {createComments} from './comments.js';
import {generateUniqueIDs, getRandomArrayElement, getRandomIntegerFromRange} from './utils.js';

const {photoIDs, likesQuantity, photoDescriptions} = photoMockData;

const photoIDGenerator = generateUniqueIDs(photoIDs.min, photoIDs.max);
const photoURLGenerator = generateUniqueIDs(photoIDs.min, photoIDs.max);

const createPhoto = () => ({
  id: photoIDGenerator(),
  url: `photos/${photoURLGenerator()}.jpg`,
  description: getRandomArrayElement(photoDescriptions),
  likes: getRandomIntegerFromRange(likesQuantity.min, likesQuantity.max),
  comments: createComments()
});

export const initPhotos = () => Array.from({length: photoIDs.max}, createPhoto);
