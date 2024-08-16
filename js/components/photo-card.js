import {KeyCode} from '../const.js';

const photoCard = document.querySelector('.big-picture');
const closeButton = photoCard.querySelector('.big-picture__cancel');

const updateCardContent = (cardData) => {
  const {url, likes, totalCommentsCount} = cardData;

  photoCard.querySelector('.big-picture__img img').src = url;
  photoCard.querySelector('.likes-count').textContent = likes;
  photoCard.querySelector('.social__comment-total-count').textContent = totalCommentsCount;
};

const closeButtonHandler = () => {
  closePhotoCard();
};

const keydownHandler = (evt) => {
  if (evt.keyCode === KeyCode.ESC) {
    closePhotoCard();
  }
};

// Функция не стрелочная, потому что нужен хойстинг
function closePhotoCard () {
  document.removeEventListener('keydown', keydownHandler);
  closeButton.removeEventListener('click', closeButtonHandler);

  photoCard.classList.add('hidden');
}

export const openPhotoCard = (cardData) => {
  updateCardContent(cardData);

  photoCard.classList.remove('hidden');

  closeButton.addEventListener('click', closeButtonHandler);
  document.addEventListener('keydown', keydownHandler);
};
