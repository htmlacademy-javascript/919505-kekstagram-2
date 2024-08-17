import {createThumbnail} from './thumbnail-item.js';

const thumbnailListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

export const renderThumbnails = (data) => {
  data.forEach((entity) => {
    const newThumbnail = createThumbnail(entity);
    fragment.appendChild(newThumbnail);
  });

  thumbnailListElement.appendChild(fragment);
};

export const initThumbnailList = (data, callback) => {
  thumbnailListElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    const activeThumbnail = evt.target.closest('.picture');

    if (activeThumbnail) {
      const activeThumbnailId = activeThumbnail.dataset.userId;
      const activeThumbnailData = data.find((entity) => entity.id === Number(activeThumbnailId));

      callback(activeThumbnailData);
    }
  });
};
