import {initFromValidator, removeErrors} from './validator.js';
import {initEffectFilter, resetEffectFilter, changeEffectPreviews} from './filter-effect.js';
import {initImageResize, resetImgScale} from './image-resize.js';
import {postFormData} from '../../api.js';
import {openModal} from '../modals/photo-upload-result.js';
import {KeyCode, ModalType, SubmitButtonText, IMAGE_TYPES} from '../../const.js';

const formElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = formElement.querySelector('.img-upload__input');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const imgUploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const imgUploadCloseButtonElement = formElement.querySelector('.img-upload__cancel');
const imgPreviewElement = formElement.querySelector('.img-upload__preview img');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

/**
 * @type {Function}
 */
const validateForm = initFromValidator(formElement, hashtagsInputElement, descriptionInputElement);

const closeButtonHandler = () => {
  closeForm();
};

const keydownHandler = (evt) => {
  if (evt.key === KeyCode.ESC && !document.querySelector(`.${ModalType.ERROR}`)) {
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
  removeErrors();

  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', keydownHandler);

  imgUploadInputElement.value = '';
  hashtagsInputElement.value = '';
  descriptionInputElement.value = '';

  validateForm();
}

const openForm = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', keydownHandler);
};

const imgUploadHandler = () => {
  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = IMAGE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    imgPreviewElement.src = URL.createObjectURL(file);
    changeEffectPreviews(imgPreviewElement.src);
    openForm();
  }
};

const handleSuccessfulUploading = () => {
  closeForm();
  openModal(ModalType.SUCCESS);
};

const handleErrorUploading = () => {
  openModal(ModalType.ERROR);
};

const setSubmitButtonDisabled = (flag) => {
  submitButtonElement.disabled = flag;

  if (flag) {
    submitButtonElement.textContent = SubmitButtonText.LOADING;
  } else {
    submitButtonElement.textContent = SubmitButtonText.IDLE;
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  const isFormValid = validateForm();
  if (isFormValid) {
    removeErrors();
    const formData = new FormData(formElement);
    void postFormData(formData, handleSuccessfulUploading, handleErrorUploading, setSubmitButtonDisabled);
  }
};

export const initUploadForm = () => {
  initEffectFilter(formElement, imgPreviewElement);
  initImageResize(formElement, imgPreviewElement);

  imgUploadInputElement.addEventListener('change', imgUploadHandler);
  imgUploadCloseButtonElement.addEventListener('click', closeButtonHandler);
  hashtagsInputElement.addEventListener('keydown', inputKeydownHandler);
  descriptionInputElement.addEventListener('keydown', inputKeydownHandler);
  submitButtonElement.addEventListener('click', formSubmitHandler);
};
