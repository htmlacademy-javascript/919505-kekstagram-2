import {createThumbnail} from './thumbnail-item.js';

const thumbnailListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

export const renderThumbnailList = (data) => {
  data.forEach((entity) => {
    const newThumbnail = createThumbnail(entity);
    fragment.appendChild(newThumbnail);
  });

  thumbnailListElement.appendChild(fragment);
};
