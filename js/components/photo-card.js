const photoCard = document.querySelector('.big-picture');
const closeButton = photoCard.querySelector('.big-picture__cancel');

const closePhotoCardHandler = () => {
  photoCard.classList.add('hidden');
  closeButton.removeEventListener('click', closePhotoCardHandler);
};

const updateCardData = (cardData) => {
  const {url, likes, totalCommentsCount} = cardData;
  photoCard.querySelector('.big-picture__img img').src = url;
  photoCard.querySelector('.likes-count').textContent = likes;
  photoCard.querySelector('.social__comment-total-count').textContent = totalCommentsCount;
};

export const openPhotoCard = (thumbnail) => {
  const url = thumbnail.querySelector('.picture__img').src;
  const likes = thumbnail.querySelector('.picture__likes').textContent;
  const totalCommentsCount = thumbnail.querySelector('.picture__comments').textContent;

  updateCardData({url, likes, totalCommentsCount});
  photoCard.classList.remove('hidden');
  closeButton.addEventListener('click', closePhotoCardHandler);
};
