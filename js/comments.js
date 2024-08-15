import {commentsMockData} from './mocks.js';
import {generateUniqueIDs, getRandomArrayElement, getRandomIntegerFromRange} from './utils.js';

const {commentIDs, avatarIDs, messageQuantity, messageSentences, messages, names} = commentsMockData;
const commentIDGenerator = generateUniqueIDs(commentIDs.min, commentIDs.max);

const createMessage = () => {
  const result = [];
  const totalSentences = getRandomIntegerFromRange(messageSentences.min, messageSentences.max);

  if (totalSentences > messages.length) {
    return messages.join(' ');
  }

  for (let i = 0; i < totalSentences; i++) {
    let randomIndex = getRandomIntegerFromRange(0, messages.length - 1);

    while (result.includes(messages[randomIndex])) {
      randomIndex = getRandomIntegerFromRange(0, messages.length - 1);
    }

    result.push(messages[randomIndex]);
  }

  return result.join(' ');
};

export const createComments = () => {
  const result = [];
  const commentsQuantity = getRandomIntegerFromRange(messageQuantity.min, messageQuantity.max);

  for (let i = 0; i < commentsQuantity; i++) {
    result.push({
      id: commentIDGenerator(),
      avatar: `img/avatar-${getRandomIntegerFromRange(avatarIDs.min, avatarIDs.max)}.svg`,
      message: createMessage(),
      name: getRandomArrayElement(names)
    });
  }

  return result;
};
