import {photoMockData} from './mocks.js';
import {generateCommentsData} from './comments.js';
import {generateUniqueIDs, getRandomArrayElement, getRandomIntegerFromRange} from '../utils.js';

const {photoIDs, likesQuantity, photoDescriptions} = photoMockData;

const photoIDGenerator = generateUniqueIDs(photoIDs.min, photoIDs.max);
const photoURLGenerator = generateUniqueIDs(photoIDs.min, photoIDs.max);

const createPhotoData = () => ({
  id: photoIDGenerator(),
  url: `photos/${photoURLGenerator()}.jpg`,
  description: getRandomArrayElement(photoDescriptions),
  likes: getRandomIntegerFromRange(likesQuantity.min, likesQuantity.max),
  comments: generateCommentsData()
});

export const generatePhotosData = () => Array.from({length: photoIDs.max}, createPhotoData);
