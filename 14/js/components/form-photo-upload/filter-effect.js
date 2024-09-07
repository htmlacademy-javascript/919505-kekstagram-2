import {effectsConfig} from './config.js';

let imgPreview = null;
let effectPreviews = null;
let effectSliderContainer = null;
let effectSliderDiv = null;
let effectInputsList = null;
let effectLevelInput = null;
let initialRadioInput = null;

const updateFilterEffect = (filterObject) => {
  effectSliderDiv.noUiSlider.updateOptions(filterObject.settings);

  effectSliderDiv.noUiSlider.on('update', () => {
    const effectLevel = effectSliderDiv.noUiSlider.get();
    imgPreview.style.filter = `${filterObject.filter}(${effectLevel}${filterObject.postfix})`;
    effectLevelInput.value = effectLevel;
  });

  effectSliderContainer.classList.remove('hidden');
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
  initialRadioInput.checked = true;
  effectLevelInput.value = 'none';
  imgPreview.style.filter = '';
  effectSliderContainer.classList.add('hidden');
}

export const changeEffectPreviews = (imageSrc) => {
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageSrc})`;
  });
};

export const initEffectFilter = (form, imgPreviewElem) => {
  imgPreview = imgPreviewElem;
  effectPreviews = form.querySelectorAll('.effects__preview');
  effectInputsList = form.querySelector('.effects__list');
  effectLevelInput = form.querySelector('.effect-level__value');
  effectSliderDiv = form.querySelector('.effect-level__slider');
  effectSliderContainer = form.querySelector('.img-upload__effect-level');
  initialRadioInput = form.querySelector('#effect-none');

  noUiSlider.create(effectSliderDiv, effectsConfig.initial);

  effectInputsList.addEventListener('change', handleRadioChange);
  effectSliderContainer.classList.add('hidden');
};
