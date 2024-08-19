import {deleteComments, updateComments} from './comments.js';
import {KeyCode} from '../const.js';

const photoCard = document.querySelector('.big-picture');
const closeButton = photoCard.querySelector('.big-picture__cancel');
const imgElement = photoCard.querySelector('.big-picture__img img');
const likesElement = photoCard.querySelector('.likes-count');
const descriptionElement = photoCard.querySelector('.social__caption');
const shownCommentsElement = photoCard.querySelector('.social__comment-shown-count');
const totalCommentsElement = photoCard.querySelector('.social__comment-total-count');

const updateCardContent = (data) => {
  const {url, likes, description, comments} = data;

  imgElement.src = url;
  imgElement.alt = description;
  likesElement.textContent = likes;
  descriptionElement.textContent = description;
  shownCommentsElement.textContent = comments.length.toString();
  totalCommentsElement.textContent = comments.length.toString();

  deleteComments();
  updateComments(comments);
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

  photoCard.classList.add('hidden');
}

export const openPhotoCard = (data) => {
  updateCardContent(data);

  photoCard.classList.remove('hidden');

  closeButton.addEventListener('click', closeButtonHandler);
  document.addEventListener('keydown', keydownHandler);
  document.body.classList.add('modal-open');

  // Временно скрываем блоки счетчика и загрузки комментариев
  photoCard.querySelector('.social__comment-count').classList.add('hidden');
  photoCard.querySelector('.comments-loader').classList.add('hidden');
};
