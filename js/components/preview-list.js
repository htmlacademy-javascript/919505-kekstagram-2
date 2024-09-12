import {createPreview} from './preview-item.js';
import {initPhotoCard} from './photo-card.js';
import {getPhotos} from '../store/photos.js';

const previewListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

/**
 * @type {Function}
 */
const openPhotoCardCallback = initPhotoCard();

const renderPreviews = (photoData) => {
  photoData.forEach((entity) => {
    const newPreview = createPreview(entity);
    fragment.appendChild(newPreview);
  });

  previewListElement.appendChild(fragment);
};

const clearPreviewList = () => {
  const previewElements = document.querySelectorAll('.picture');

  previewElements.forEach((preview) => preview.remove());
};

export const refreshPreviews = (data) => {
  clearPreviewList();
  renderPreviews(data);
};

export const initPreviewList = () => {
  const photoData = getPhotos();
  renderPreviews(photoData);

  previewListElement.addEventListener('click', (evt) => {
    const activePreview = evt.target.closest('.picture');

    if (activePreview) {
      evt.preventDefault();
      const activePreviewId = activePreview.dataset.photoId;
      const activePreviewData = photoData.find((entity) => entity.id === Number(activePreviewId));

      openPhotoCardCallback(activePreviewData);
    }
  });
};
