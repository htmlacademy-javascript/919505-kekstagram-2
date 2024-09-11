import {
  MAX_HASHTAGS_AMOUNT,
  MAX_DESCRIPTION_LENGTH,
  HASHTAG_REGEXP,
  pristineConfig,
  ValidationErrorMessages
} from './config.js';

let form = null;
let hashtagsInput = null;
let descriptionInput = null;

let currentHashtagErrors = '';

const getCurrentHashtagErrors = () => currentHashtagErrors;

const addHashtagError = (newError) => {
  if (!currentHashtagErrors) {
    currentHashtagErrors = newError;
  } else if (!currentHashtagErrors.includes(newError)) {
    currentHashtagErrors += `, ${newError}`;
  }
};

const validateHashtags = () => {
  currentHashtagErrors = '';

  if (!hashtagsInput.value) {
    return true;
  }

  let isValid = true;

  const hashtagsArray = hashtagsInput.value.toLowerCase().split(' ');
  const filteredHashtagsArray = hashtagsArray.filter((hashtag) => hashtag !== '');

  const hashtagSet = new Set();

  if (filteredHashtagsArray.length > MAX_HASHTAGS_AMOUNT) {
    addHashtagError(ValidationErrorMessages.TOO_MANY_HASHTAGS);
    isValid = false;
  }

  filteredHashtagsArray.forEach((hashtag) => {
    if (!HASHTAG_REGEXP.test(hashtag)) {
      addHashtagError(ValidationErrorMessages.INVALID_HASHTAG);
      isValid = false;
    }

    if (hashtagSet.has(hashtag)) {
      addHashtagError(ValidationErrorMessages.REPEATED_HASHTAGS);
      isValid = false;
    }

    hashtagSet.add(hashtag);
  });

  return isValid;
};

const validateDescription = () => descriptionInput.value.length <= MAX_DESCRIPTION_LENGTH;

export const removeErrors = () => {
  const errorElements = form.querySelectorAll('.pristine-error');
  errorElements.forEach((element) => element.remove());
};

export const initFromValidator = (formElem, hashtagsInputElem, descriptionInputElem) => {
  form = formElem;
  hashtagsInput = hashtagsInputElem;
  descriptionInput = descriptionInputElem;

  const pristine = new Pristine(formElem, pristineConfig.settings, pristineConfig.isLiveValidation);

  pristine.addValidator(hashtagsInput, validateHashtags, getCurrentHashtagErrors);
  pristine.addValidator(descriptionInput, validateDescription, ValidationErrorMessages.TOO_LONG_COMMENT);

  return pristine.validate;
};
