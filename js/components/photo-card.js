import {initComments, closeComments} from './comment-list.js';
import {KeyCode} from '../const.js';

const photoCardElement = document.querySelector('.big-picture');
const closeElement = photoCardElement.querySelector('.big-picture__cancel');
const imageElement = photoCardElement.querySelector('.big-picture__img img');
const likesElement = photoCardElement.querySelector('.likes-count');
const captionElement = photoCardElement.querySelector('.social__caption');

const updateCardContent = (data) => {
  const {url, likes, description, comments} = data;

  imageElement.src = url;
  imageElement.alt = description;
  likesElement.textContent = likes;
  captionElement.textContent = description;

  initComments(comments);
};

const closeButtonHandler = () => {
  closePhotoCard();
};

const keydownHandler = (evt) => {
  if (evt.key === KeyCode.ESC) {
    closePhotoCard();
  }
};

// Функция не стрелочная, потому что нужен хойстинг
function closePhotoCard () {
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', keydownHandler);

  closeComments();

  photoCardElement.classList.add('hidden');
}

const openPhotoCard = (data) => {
  updateCardContent(data);

  photoCardElement.classList.remove('hidden');

  document.addEventListener('keydown', keydownHandler);
  document.body.classList.add('modal-open');
};

export const initPhotoCard = () => {
  closeElement.addEventListener('click', closeButtonHandler);
  return openPhotoCard;
};
