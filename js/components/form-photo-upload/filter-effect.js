import {effectsConfig} from './config.js';

let imgPreview = null;
let effectPreviews = null;
let effectSliderContainer = null;
let effectSliderDiv = null;
let effectInputsList = null;
let effectLevelInput = null;

const updateFilterEffect = (filterName) => {
  const currentFilterObject = effectsConfig[filterName];
  effectSliderDiv.noUiSlider.updateOptions(currentFilterObject.settings);

  effectSliderDiv.noUiSlider.on('update', () => {
    const effectLevel = effectSliderDiv.noUiSlider.get();
    imgPreview.style.filter = `${currentFilterObject.filter}(${effectLevel}${currentFilterObject.postfix})`;
    effectLevelInput.value = effectLevel;
  });

  effectSliderContainer.classList.remove('hidden');
};

const handleRadioChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    const selectedEffect = evt.target.value;

    switch (selectedEffect) {
      case effectsConfig.chrome.name:
        updateFilterEffect(effectsConfig.chrome.name);
        break;

      case effectsConfig.sepia.name:
        updateFilterEffect(effectsConfig.sepia.name);
        break;

      case effectsConfig.marvin.name:
        updateFilterEffect(effectsConfig.marvin.name);
        break;

      case effectsConfig.phobos.name:
        updateFilterEffect(effectsConfig.phobos.name);
        break;

      case effectsConfig.heat.name:
        updateFilterEffect(effectsConfig.heat.name);
        break;

      default:
        resetEffectFilter();
        break;
    }
  }
};

// Функция не стрелочная, потому что нужен хойстинг
export function resetEffectFilter () {
  effectLevelInput.value = 'none';
  imgPreview.style.filter = '';
  effectSliderContainer.classList.add('hidden');
}

export const changeEffectPreviews = (imageSrc) => {
  effectPreviews.forEach((preview) => {preview.style.backgroundImage = `url(${imageSrc})`});
}

export const initEffectFilter = (form, imgPreviewElem) => {
  imgPreview = imgPreviewElem;
  effectPreviews = form.querySelectorAll('.effects__preview');
  effectInputsList = form.querySelector('.effects__list');
  effectLevelInput = form.querySelector('.effect-level__value');
  effectSliderDiv = form.querySelector('.effect-level__slider');
  effectSliderContainer = form.querySelector('.img-upload__effect-level');

  noUiSlider.create(effectSliderDiv, effectsConfig.initial);

  effectInputsList.addEventListener('change', handleRadioChange);
  effectSliderContainer.classList.add('hidden');
};
