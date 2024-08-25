import {createPreview} from './preview-item.js';

const previewListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const renderPreviews = (photoData) => {
  photoData.forEach((entity) => {
    const newPreview = createPreview(entity);
    fragment.appendChild(newPreview);
  });

  previewListElement.appendChild(fragment);
};

export const initPreviewList = (photoData, onPreviewClickCallback) => {
  renderPreviews(photoData);

  previewListElement.addEventListener('click', (evt) => {
    const activePreview = evt.target.closest('.picture');

    if (activePreview) {
      evt.preventDefault();
      const activePreviewId = activePreview.dataset.photoId;
      const activePreviewData = photoData.find((entity) => entity.id === Number(activePreviewId));

      onPreviewClickCallback(activePreviewData);
    }
  });
};
