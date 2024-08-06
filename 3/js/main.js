// Const
const PHOTO_DESCRIPTIONS = [
  'accusamus beatae ad facilis cum similique qui sunt',
  'reprehenderit est deserunt velit ipsam',
  'officia porro iure quia iusto qui ipsa ut modi',
  'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
  'natus nisi omnis corporis facere molestiae rerum in',
  'accusamus ea aliquid et amet sequi nemo',
  'officia delectus consequatur vero aut veniam explicabo molestias',
  'aut porro officiis laborum odit ea laudantium corporis'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Артём', 'Иван', 'Иннокентий', 'Бенджамин', 'Себастьян', 'Арнольд'];

const PhotoNumbers = {MIN: 1, MAX: 25};
const LikesQuantity = {MIN: 25, MAX: 200};

const CommentIDs = {MIN: 1, MAX: 10000};
const AvatarIDs = {MIN: 1, MAX: 6};
const MessageQuantity = {MIN: 0, MAX: 30};
const MessageSentences = {MIN: 1, MAX: 2};
// ---------------------------------

// Utils
const getRandomIntegerFromRange = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (array) => array[getRandomIntegerFromRange(0, array.length - 1)];

const generateUniqueIDs = (min, max) => {
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
// ---------------------------------

const photoIDGenerator = generateUniqueIDs(PhotoNumbers.MIN, PhotoNumbers.MAX);
const photoURLGenerator = generateUniqueIDs(PhotoNumbers.MIN, PhotoNumbers.MAX);
const commentIDGenerator = generateUniqueIDs(CommentIDs.MIN, CommentIDs.MAX);

const createMessage = () => {
  const result = [];
  const totalSentences = getRandomIntegerFromRange(MessageSentences.MIN, MessageSentences.MAX);

  if (totalSentences > MESSAGES.length) {
    return MESSAGES.join(' ');
  }

  for (let i = 0; i < totalSentences; i++) {
    let randomIndex = getRandomIntegerFromRange(0, MESSAGES.length - 1);

    while (result.includes(MESSAGES[randomIndex])) {
      randomIndex = getRandomIntegerFromRange(0, MESSAGES.length - 1);
    }

    result.push(MESSAGES[randomIndex]);
  }

  return result.join(' ');
};

const createComments = () => {
  const result = [];
  const commentsQuantity = getRandomIntegerFromRange(MessageQuantity.MIN, MessageQuantity.MAX);

  for (let i = 0; i < commentsQuantity; i++) {
    result.push({
      id: commentIDGenerator(),
      avatar: `img/avatar-${getRandomIntegerFromRange(AvatarIDs.MIN, AvatarIDs.MAX)}.svg`,
      message: createMessage(),
      name: getRandomArrayElement(NAMES)
    });
  }

  return result;
};

const createPhoto = () => ({
  id: photoIDGenerator(),
  url: `photos/${photoURLGenerator()}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomIntegerFromRange(LikesQuantity.MIN, LikesQuantity.MAX),
  comments: createComments()
});

const photos = Array.from({length: PhotoNumbers.MAX}, createPhoto);

// eslint-disable-next-line no-console
console.log(photos);
