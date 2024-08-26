import {initFromValidator} from './validator.js';
import {KeyCode} from '../../const.js';

const imgScaleConfig = {
  min: 25,
  max: 100,
  step: 25,
  initialScale: 100
}

const form = document.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCloseButton = form.querySelector('.img-upload__cancel');
const imgPreview = form.querySelector('.img-upload__preview img');
const decreaseScaleButton = form.querySelector('.scale__control--smaller');
const scaleControl = form.querySelector('.scale__control--value');
const increaseScaleButton = form.querySelector('.scale__control--bigger');

/**
 * @type {Function}
 */
const validateForm = initFromValidator(form, hashtagsInput, descriptionInput);

const updatePreview = (file) => {
  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      imgPreview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
};

const changeImgScale = (scale) => {
  const computedScale = scale / 100;
  imgPreview.style.transform = `scale(${computedScale})`;
}

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
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadCloseButton.removeEventListener('click', closeButtonHandler);
  hashtagsInput.removeEventListener('keydown', inputKeydownHandler);
  descriptionInput.removeEventListener('keydown', inputKeydownHandler);
  document.removeEventListener('keydown', keydownHandler);

  imgUploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
}

const imgUploadHandler = (evt) => {
  const file = evt.target.files[0];

  if (file) {
    updatePreview(file);
    validateForm();

    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    changeImgScale(imgScaleConfig.initialScale);

    imgUploadCloseButton.addEventListener('click', closeButtonHandler);
    hashtagsInput.addEventListener('keydown', inputKeydownHandler);
    descriptionInput.addEventListener('keydown', inputKeydownHandler);
    document.addEventListener('keydown', keydownHandler);
  }
};

const formSubmitHandler = () => {
  validateForm();
};

const decreaseScaleHandler = () => {
  let currentScale = Number(scaleControl.value.slice(0, scaleControl.value.length - 1));

  if (currentScale <= imgScaleConfig.min) {
    return;
  }

  const newScale = currentScale - imgScaleConfig.step;

  scaleControl.value = `${newScale}%`;
  changeImgScale(newScale);
}

const increaseScaleHandler = () => {
  let currentScale = Number(scaleControl.value.slice(0, scaleControl.value.length - 1));

  if (currentScale >= imgScaleConfig.max) {
    return;
  }

  const newScale = currentScale + imgScaleConfig.step;

  scaleControl.value = `${newScale}%`;
  changeImgScale(newScale);
}

export const initUploadForm = () => {
  imgUploadInput.addEventListener('change', imgUploadHandler);
  decreaseScaleButton.addEventListener('click', decreaseScaleHandler);
  increaseScaleButton.addEventListener('click', increaseScaleHandler);
  form.addEventListener('submit', formSubmitHandler);
};
