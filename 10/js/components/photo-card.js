import {initComments, closeComments} from './comments.js';
import {KeyCode} from '../const.js';

const photoCard = document.querySelector('.big-picture');
const closeButton = photoCard.querySelector('.big-picture__cancel');
const imgElement = photoCard.querySelector('.big-picture__img img');
const likesElement = photoCard.querySelector('.likes-count');
const descriptionElement = photoCard.querySelector('.social__caption');

const updateCardContent = (data) => {
  const {url, likes, description, comments} = data;

  imgElement.src = url;
  imgElement.alt = description;
  likesElement.textContent = likes;
  descriptionElement.textContent = description;

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
  closeButton.removeEventListener('click', closeButtonHandler);

  closeComments();

  photoCard.classList.add('hidden');
}

export const openPhotoCard = (data) => {
  updateCardContent(data);

  photoCard.classList.remove('hidden');

  closeButton.addEventListener('click', closeButtonHandler);
  document.addEventListener('keydown', keydownHandler);
  document.body.classList.add('modal-open');
};
