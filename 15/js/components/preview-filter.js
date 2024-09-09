import {getRandomElementsFromArray} from '../utils.js';
import {debounce} from '../debounce.js';

const RANDOM_PREVIEWS_QUANTITY = 10;

const previewFilterElement = document.querySelector('.img-filters');
const defaultPreviewsButton = previewFilterElement.querySelector('#filter-default');
const randomPreviewsButton = previewFilterElement.querySelector('#filter-random');
const discussedPreviewsButton = previewFilterElement.querySelector('#filter-discussed');

let photoData = [];
let renderWithDebounce = () => {};
let currentActiveButton = defaultPreviewsButton;

const changeActiveButton = (newActiveButton) => {
  currentActiveButton.classList.remove('img-filters__button--active');
  newActiveButton.classList.add('img-filters__button--active');
  currentActiveButton = newActiveButton;
};

const defaultPreviewsClickHandler = () => {
  changeActiveButton(defaultPreviewsButton);
  renderWithDebounce(() => photoData);
};

const randomPreviewsClickHandler = () => {
  changeActiveButton(randomPreviewsButton);
  renderWithDebounce(() => getRandomElementsFromArray(photoData, RANDOM_PREVIEWS_QUANTITY));
};

const discussedPreviewsClickHandler = () => {
  changeActiveButton(discussedPreviewsButton);
  renderWithDebounce(() => photoData.slice().sort((a, b) => b.comments.length - a.comments.length));
};

export const initPreviewFilter = (data, refreshPreviews) => {
  photoData = data;
  renderWithDebounce = debounce((cb) => refreshPreviews(cb()));

  previewFilterElement.classList.remove('img-filters--inactive');

  defaultPreviewsButton.addEventListener('click', defaultPreviewsClickHandler);
  randomPreviewsButton.addEventListener('click', randomPreviewsClickHandler);
  discussedPreviewsButton.addEventListener('click', discussedPreviewsClickHandler);
};
