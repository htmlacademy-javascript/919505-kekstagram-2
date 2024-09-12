import {ImgScaleConfig} from './config.js';
const HUNDRED_PERCENT = 100;

let form = null;
let imgPreview = null;
let scalePanelElement = null;
let scaleControlElement = null;
let currentScale = ImgScaleConfig.INITIAL_SCALE;

const changeImgScale = (scale) => {
  const computedScale = scale / HUNDRED_PERCENT;

  imgPreview.style.transform = `scale(${computedScale})`;
  scaleControlElement.value = `${scale}%`;
  scaleControlElement.setAttribute('value', `${scale}%`);
};

const decreaseScaleHandler = () => {
  if (currentScale > ImgScaleConfig.MIN) {
    currentScale = currentScale - ImgScaleConfig.STEP;
    changeImgScale(currentScale);
  }
};

const increaseScaleHandler = () => {
  if (currentScale < ImgScaleConfig.MAX) {
    currentScale = currentScale + ImgScaleConfig.STEP;
    changeImgScale(currentScale);
  }
};

export const resetImgScale = () => changeImgScale(ImgScaleConfig.INITIAL_SCALE);

export const initImageResize = (formElem, imgPreviewElem) => {
  form = formElem;
  imgPreview = imgPreviewElem;
  scalePanelElement = form.querySelector('.img-upload__scale');
  scaleControlElement = scalePanelElement.querySelector('.scale__control--value');

  const decreaseScaleElement = scalePanelElement.querySelector('.scale__control--smaller');
  const increaseScaleElement = scalePanelElement.querySelector('.scale__control--bigger');

  decreaseScaleElement.addEventListener('click', decreaseScaleHandler);
  increaseScaleElement.addEventListener('click', increaseScaleHandler);
};
