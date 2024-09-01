import {initFromValidator} from './validator.js';
import {initEffectFilter, resetEffectFilter} from './filter-effect.js';
import {initImageResize, resetImgScale} from './image-resize.js';
import {KeyCode} from '../../const.js';

const form = document.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCloseButton = form.querySelector('.img-upload__cancel');
const imgPreview = form.querySelector('.img-upload__preview img');

/**
 * @type {Function}
 */
const validateForm = initFromValidator(form, hashtagsInput, descriptionInput);

const closeButtonHandler = () => {
  closeForm();
};

const keydownHandler = (evt) => {
  if (evt.key === KeyCode.ESC) {
    closeForm();
  }
};

const inputKeydownHandler = (evt) => {
  if (evt.key === KeyCode.ESC) {
    evt.stopPropagation();
  }
};

// Функция не стрелочная, потому что нужен хойстинг
function closeForm () {
  resetImgScale();
  resetEffectFilter();

  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', keydownHandler);

  imgUploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';

  validateForm();
}

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', keydownHandler);
};

const imgUploadHandler = (evt) => {
  const file = evt.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      imgPreview.src = e.target.result;
    });
    reader.readAsDataURL(file);

    openForm();
  }
};

const formSubmitHandler = () => {
  validateForm();
};

export const initUploadForm = () => {
  initEffectFilter(form, imgPreview);
  initImageResize(form, imgPreview);

  imgUploadInput.addEventListener('change', imgUploadHandler);
  imgUploadCloseButton.addEventListener('click', closeButtonHandler);
  hashtagsInput.addEventListener('keydown', inputKeydownHandler);
  descriptionInput.addEventListener('keydown', inputKeydownHandler);
  form.addEventListener('submit', formSubmitHandler);
};
