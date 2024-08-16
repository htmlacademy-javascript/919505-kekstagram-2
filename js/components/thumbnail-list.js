import {createThumbnail} from './thumbnail-item.js';

const picturesListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

export const renderThumbnailList = (data) => {
  data.forEach((entity) => {
    const newPhoto = createThumbnail(entity);
    fragment.appendChild(newPhoto);
  });

  picturesListElement.appendChild(fragment);
};
