const photoCard = document.querySelector('.big-picture');
const closeButton = photoCard.querySelector('.big-picture__cancel');

const updateCardContent = (cardData) => {
  const {url, likes, totalCommentsCount} = cardData;

  photoCard.querySelector('.big-picture__img img').src = url;
  photoCard.querySelector('.likes-count').textContent = likes;
  photoCard.querySelector('.social__comment-total-count').textContent = totalCommentsCount;
};

const closePhotoCardHandler = () => {
  photoCard.classList.add('hidden');
  closeButton.removeEventListener('click', closePhotoCardHandler);
};

export const openPhotoCard = (cardData) => {
  updateCardContent(cardData);

  closeButton.addEventListener('click', closePhotoCardHandler);
  photoCard.classList.remove('hidden');
};
