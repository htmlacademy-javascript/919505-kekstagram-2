import {getRandomElementsFromArray} from '../utils.js';

const RANDOM_PREVIEWS_QUANTITY = 10;

const previewFilterElement = document.querySelector('.img-filters');
const defaultPreviewsButton = previewFilterElement.querySelector('#filter-default');
const randomPreviewsButton = previewFilterElement.querySelector('#filter-random');
const discussedPreviewsButton = previewFilterElement.querySelector('#filter-discussed');

let photoData = [];
let renderPreviewList = null;
let clearPreviewList = null;
let currentActiveButton = defaultPreviewsButton;

const changeActiveButton = (newActiveButton) => {
  currentActiveButton.classList.remove('img-filters__button--active');
  newActiveButton.classList.add('img-filters__button--active');
  currentActiveButton = newActiveButton;
};

const rerenderPreviews = (data) => {
  clearPreviewList();
  renderPreviewList(data);
};

const defaultPreviewsClickHandler = () => {
  changeActiveButton(defaultPreviewsButton);
  rerenderPreviews(photoData);
};

const randomPreviewsClickHandler = () => {
  changeActiveButton(randomPreviewsButton);

  const newPreviewsArray = getRandomElementsFromArray(photoData, RANDOM_PREVIEWS_QUANTITY);
  rerenderPreviews(newPreviewsArray);
};

const discussedPreviewsClickHandler = () => {
  changeActiveButton(discussedPreviewsButton);

  const newPreviewsArray = photoData.slice().sort((a, b) => b.comments.length - a.comments.length);
  rerenderPreviews(newPreviewsArray);
};


export const initPreviewFilter = (data, renderPreviewListCallback, clearPreviewsListCallback) => {
  photoData = data;
  renderPreviewList = renderPreviewListCallback;
  clearPreviewList = clearPreviewsListCallback;

  previewFilterElement.classList.remove('img-filters--inactive');

  defaultPreviewsButton.addEventListener('click', defaultPreviewsClickHandler);
  randomPreviewsButton.addEventListener('click', randomPreviewsClickHandler);
  discussedPreviewsButton.addEventListener('click', discussedPreviewsClickHandler);
};
