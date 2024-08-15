import {createPhoto} from './photo-item.js';

const picturesListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

export const renderPhotoList = (data) => {
  data.forEach((entity) => {
    const newPhoto = createPhoto(entity);
    fragment.appendChild(newPhoto);
  });

  picturesListElement.appendChild(fragment);
};
