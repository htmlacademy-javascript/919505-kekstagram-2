import {EffectsConfig} from './config.js';

let imgPreview = null;
let effectSliderContainer = null
let effectSliderDiv = null;
let effectInputsList = null;
let effectLevelInput = null;

const updateFilterEffect = (filterName) => {
  const currentFilterObject = EffectsConfig[filterName];
  effectSliderDiv.noUiSlider.updateOptions(currentFilterObject.settings);

  effectSliderDiv.noUiSlider.on('update', () => {
    const effectLevel = effectSliderDiv.noUiSlider.get();
    imgPreview.style.filter = `${currentFilterObject.filter}(${effectLevel}${currentFilterObject.postfix})`;
    effectLevelInput.value = effectLevel;
  });

  effectSliderContainer.classList.remove('hidden');
}

const handleRadioChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    const selectedEffect = evt.target.value;

    switch (selectedEffect) {
      case EffectsConfig.chrome.name:
        updateFilterEffect(EffectsConfig.chrome.name);
        break;

      case EffectsConfig.sepia.name:
        updateFilterEffect(EffectsConfig.sepia.name);
        break;

      case EffectsConfig.marvin.name:
        updateFilterEffect(EffectsConfig.marvin.name);
        break;

      case EffectsConfig.phobos.name:
        updateFilterEffect(EffectsConfig.phobos.name);
        break;

      case EffectsConfig.heat.name:
        updateFilterEffect(EffectsConfig.heat.name);
        break;

      default:
        evt.target.value = EffectsConfig.none;
        effectLevelInput.value = 'none';
        imgPreview.style.filter = '';
        effectSliderContainer.classList.add('hidden');
        break;
    }
  }
}

export const initEffectFilter = (form, imgPreviewElem) => {
  imgPreview = imgPreviewElem;
  effectInputsList = form.querySelector('.effects__list');
  effectLevelInput = form.querySelector('.effect-level__value');
  effectSliderDiv = form.querySelector('.effect-level__slider');
  effectSliderContainer = form.querySelector('.img-upload__effect-level');

  noUiSlider.create(effectSliderDiv, EffectsConfig.initial);

  effectInputsList.addEventListener('change', handleRadioChange);
  effectSliderContainer.classList.add('hidden');
}
