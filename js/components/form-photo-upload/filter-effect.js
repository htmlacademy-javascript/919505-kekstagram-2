import {effectsConfig} from './config.js';

let imgPreview = null;
let effectPreviewElements = null;
let effectLevelElement = null;
let effectSliderElement = null;
let effectInputsListElement = null;
let effectLevelInputElement = null;
let initialRadioInputElement = null;

const updateFilterEffect = (filterObject) => {
  effectSliderElement.noUiSlider.updateOptions(filterObject.settings);

  effectSliderElement.noUiSlider.on('update', () => {
    const effectLevel = effectSliderElement.noUiSlider.get();
    imgPreview.style.filter = `${filterObject.filter}(${effectLevel}${filterObject.postfix})`;
    effectLevelInputElement.value = effectLevel;
  });

  effectLevelElement.classList.remove('hidden');
};

const handleRadioChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    const selectedEffect = evt.target.value;

    if (selectedEffect === effectsConfig.none) {
      resetEffectFilter();
      return;
    }

    updateFilterEffect(effectsConfig[selectedEffect]);
  }
};

// Функция не стрелочная, потому что нужен хойстинг
export function resetEffectFilter () {
  initialRadioInputElement.checked = true;
  effectLevelInputElement.value = 'none';
  imgPreview.style.filter = '';
  effectLevelElement.classList.add('hidden');
}

export const changeEffectPreviews = (imageSrc) => {
  effectPreviewElements.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageSrc})`;
  });
};

export const initEffectFilter = (form, imgPreviewElem) => {
  imgPreview = imgPreviewElem;
  effectPreviewElements = form.querySelectorAll('.effects__preview');
  effectInputsListElement = form.querySelector('.effects__list');
  effectLevelInputElement = form.querySelector('.effect-level__value');
  effectSliderElement = form.querySelector('.effect-level__slider');
  effectLevelElement = form.querySelector('.img-upload__effect-level');
  initialRadioInputElement = form.querySelector('#effect-none');

  noUiSlider.create(effectSliderElement, effectsConfig.initial);

  effectInputsListElement.addEventListener('change', handleRadioChange);
  effectLevelElement.classList.add('hidden');
};
