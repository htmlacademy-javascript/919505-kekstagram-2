import {createPreview} from './preview-item.js';

const previewListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

export const renderPreviews = (data) => {
  data.forEach((entity) => {
    const newPreview = createPreview(entity);
    fragment.appendChild(newPreview);
  });

  previewListElement.appendChild(fragment);
};

export const initPreviewList = (data, callback) => {
  previewListElement.addEventListener('click', (evt) => {
    const activePreview = evt.target.closest('.picture');

    if (activePreview) {
      evt.preventDefault();
      const activePreviewId = activePreview.dataset.photoId;
      const activePreviewData = data.find((entity) => entity.id === Number(activePreviewId));

      callback(activePreviewData);
    }
  });
};
