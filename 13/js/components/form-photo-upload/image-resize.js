import {ImgScaleConfig} from './config';

let form = null;
let imgPreview = null;
let scalePanel = null;
let scaleControl = null;

const changeImgScale = (scale) => {
  const computedScale = scale / 100;

  imgPreview.style.transform = `scale(${computedScale})`;
  scaleControl.value = `${scale}%`;
  scaleControl.setAttribute('value', `${scale}%`);
};

const changeScaleHandler = (evt) => {
  const currentScale = Number(scaleControl.value.slice(0, scaleControl.value.length - 1));

  if (evt.target.matches('.scale__control--smaller') && currentScale > ImgScaleConfig.MIN) {
    changeImgScale(currentScale - ImgScaleConfig.STEP);
  } else if (evt.target.matches('.scale__control--bigger') && currentScale < ImgScaleConfig.MAX) {
    changeImgScale(currentScale + ImgScaleConfig.STEP);
  }
};

export const resetImgScale = () => changeImgScale(ImgScaleConfig.INITIAL_SCALE);

export const initImageResize = (formElem, imgPreviewElem) => {
  form = formElem;
  imgPreview = imgPreviewElem;
  scalePanel = form.querySelector('.img-upload__scale');
  scaleControl = scalePanel.querySelector('.scale__control--value');
  scalePanel.addEventListener('click', changeScaleHandler);
};
