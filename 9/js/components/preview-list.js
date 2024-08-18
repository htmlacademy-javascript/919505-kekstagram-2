import {createPreview} from './preview-item.js';

const PreviewListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

export const renderPreviews = (data) => {
  data.forEach((entity) => {
    const newPreview = createPreview(entity);
    fragment.appendChild(newPreview);
  });

  PreviewListElement.appendChild(fragment);
};

export const initPreviewList = (data, callback) => {
  PreviewListElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    const activePreview = evt.target.closest('.picture');

    if (activePreview) {
      const activePreviewId = activePreview.dataset.userId;
      const activePreviewData = data.find((entity) => entity.id === Number(activePreviewId));

      callback(activePreviewData);
    }
  });
};
