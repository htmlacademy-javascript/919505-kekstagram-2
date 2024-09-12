import {debounce, getRandomElementsFromArray} from '../utils.js';
import {getPhotos} from '../store/photos.js';

const DEBOUNCE_DELAY = 500;
const RANDOM_PREVIEWS_QUANTITY = 10;

const previewFilterElement = document.querySelector('.img-filters');
const defaultPreviewsElement = previewFilterElement.querySelector('#filter-default');
const randomPreviewsElement = previewFilterElement.querySelector('#filter-random');
const discussedPreviewsElement = previewFilterElement.querySelector('#filter-discussed');

let photoData = [];
let renderWithDebounce = () => {};
let currentActiveButton = defaultPreviewsElement;

const changeActiveButton = (newActiveButton) => {
  currentActiveButton.classList.remove('img-filters__button--active');
  newActiveButton.classList.add('img-filters__button--active');
  currentActiveButton = newActiveButton;
};

const defaultPreviewsClickHandler = () => {
  changeActiveButton(defaultPreviewsElement);
  renderWithDebounce(photoData);
};

const randomPreviewsClickHandler = () => {
  changeActiveButton(randomPreviewsElement);
  renderWithDebounce(getRandomElementsFromArray(photoData, RANDOM_PREVIEWS_QUANTITY));
};

const discussedPreviewsClickHandler = () => {
  changeActiveButton(discussedPreviewsElement);
  renderWithDebounce(photoData.slice().sort((a, b) => b.comments.length - a.comments.length));
};

export const showFilter = () => {
  photoData = getPhotos();
  previewFilterElement.classList.remove('img-filters--inactive');
};

export const initPreviewFilter = (refreshPreviews) => {
  renderWithDebounce = debounce(refreshPreviews, DEBOUNCE_DELAY);

  defaultPreviewsElement.addEventListener('click', defaultPreviewsClickHandler);
  randomPreviewsElement.addEventListener('click', randomPreviewsClickHandler);
  discussedPreviewsElement.addEventListener('click', discussedPreviewsClickHandler);
};
