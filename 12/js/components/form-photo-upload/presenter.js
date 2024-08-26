import {initFromValidator} from './validator.js';
import {KeyCode} from '../../const.js';

const imgScaleConfig = {
  min: 25,
  max: 100,
  step: 25,
  initialScale: 100
};

const effectsConfig = {
  none: 'none',
  chrome: 'chrome',
  sepia: 'sepia',
  marvin: 'marvin',
  phobos: 'phobos',
  heat: 'heat'
};

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
const effectInputsList = form.querySelector('.effects__list');
const effectLevelInput = form.querySelector('.effect-level__value');
const effectSliderContainer = form.querySelector('.img-upload__effect-level');
const effectSliderDiv = form.querySelector('.effect-level__slider');

noUiSlider.create(effectSliderDiv, {
  range: {min: 0, max: 1},
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

function handleRadioChange(event) {
  if (event.target.matches('.effects__radio')) {
    const selectedEffect = event.target.value;
    let effectLevel = '';

    switch (selectedEffect) {
      case effectsConfig.chrome:
        effectSliderContainer.classList.remove('hidden');

        effectSliderDiv.noUiSlider.updateOptions({
          range: {min: 0, max: 1},
          step: 0.1,
          start: 0,
        });
        effectSliderDiv.noUiSlider.on('update', () => {
          effectLevel = effectSliderDiv.noUiSlider.get();
          imgPreview.style.filter = `grayscale(${effectLevel})`;
          effectLevelInput.value = effectLevel;
        });
        break;

      case effectsConfig.sepia:
        effectSliderContainer.classList.remove('hidden');
        effectSliderDiv.noUiSlider.updateOptions({
          range: {min: 0, max: 1},
          step: 0.1,
          start: 0,
        });
        effectSliderDiv.noUiSlider.on('update', () => {
          effectLevel = effectSliderDiv.noUiSlider.get();
          imgPreview.style.filter = `sepia(${effectLevel})`;
          effectLevelInput.value = effectLevel;
        });
        break;

      case effectsConfig.marvin:
        effectSliderContainer.classList.remove('hidden');
        effectSliderDiv.noUiSlider.updateOptions({
          range: {min: 0, max: 100},
          step: 1,
          start: 0,
        });
        effectSliderDiv.noUiSlider.on('update', () => {
          effectLevel = effectSliderDiv.noUiSlider.get();
          imgPreview.style.filter = `invert(${effectLevel}%)`;
          effectLevelInput.value = effectLevel;
        });
        break;

      case effectsConfig.phobos:
        effectSliderContainer.classList.remove('hidden');
        effectSliderDiv.noUiSlider.updateOptions({
          range: {min: 0, max: 3},
          step: 0.1,
          start: 0,
        });
        effectSliderDiv.noUiSlider.on('update', () => {
          effectLevel = effectSliderDiv.noUiSlider.get();
          imgPreview.style.filter = `blur(${effectLevel}px)`;
          effectLevelInput.value = effectLevel;
        });
        break;

      case effectsConfig.heat:
        effectSliderContainer.classList.remove('hidden');
        effectSliderDiv.noUiSlider.updateOptions({
          range: {min: 1, max: 3},
          step: 0.1,
          start: 1,
        });
        effectSliderDiv.noUiSlider.on('update', () => {
          effectLevel = effectSliderDiv.noUiSlider.get();
          imgPreview.style.filter = `brightness(${effectLevel})`;
          effectLevelInput.value = effectLevel;
        });
        break;

      default:
        event.target.value = 0;
        effectLevel = '';
        effectLevelInput.value = '';
        imgPreview.style.filter = '';
        effectSliderContainer.classList.add('hidden');
        break;
    }
  }
}

effectInputsList.addEventListener('change', handleRadioChange);

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

const changeImgScale = (scale) => {
  const computedScale = scale / 100;

  imgPreview.style.transform = `scale(${computedScale})`;
  scaleControl.value = `${scale}%`;
};

const decreaseScaleHandler = () => {
  const currentScale = Number(scaleControl.value.slice(0, scaleControl.value.length - 1));

  if (currentScale <= imgScaleConfig.min) {
    return;
  }

  const newScale = currentScale - imgScaleConfig.step;
  changeImgScale(newScale);
};

const increaseScaleHandler = () => {
  const currentScale = Number(scaleControl.value.slice(0, scaleControl.value.length - 1));

  if (currentScale >= imgScaleConfig.max) {
    return;
  }

  const newScale = currentScale + imgScaleConfig.step;
  changeImgScale(newScale);
};

// Функция не стрелочная, потому что нужен хойстинг
function closeForm () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadCloseButton.removeEventListener('click', closeButtonHandler);
  hashtagsInput.removeEventListener('keydown', inputKeydownHandler);
  descriptionInput.removeEventListener('keydown', inputKeydownHandler);
  decreaseScaleButton.removeEventListener('click', decreaseScaleHandler);
  increaseScaleButton.removeEventListener('click', increaseScaleHandler);
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

export const initUploadForm = () => {
  effectSliderContainer.classList.add('hidden');

  imgUploadInput.addEventListener('change', imgUploadHandler);
  decreaseScaleButton.addEventListener('click', decreaseScaleHandler);
  increaseScaleButton.addEventListener('click', increaseScaleHandler);
  form.addEventListener('submit', formSubmitHandler);
};
