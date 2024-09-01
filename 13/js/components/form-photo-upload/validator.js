import {
  MAX_HASHTAGS_AMOUNT,
  MAX_DESCRIPTION_LENGTH,
  HASHTAG_REGEXP,
  pristineConfig,
  ValidationErrorMessages
} from './config';

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
  const inputString = hashtagsInput.value;

  if (!inputString) {
    return true;
  }

  let isValid = true;

  const hashtagsArray = hashtagsInput.value.trim().toLowerCase().split(' ');
  const hashtagSet = new Set();

  if (hashtagsArray.length > MAX_HASHTAGS_AMOUNT) {
    addHashtagError(ValidationErrorMessages.TOO_MANY_HASHTAGS);
    isValid = false;
  }

  hashtagsArray.forEach((hashtag) => {
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

export const initFromValidator = (formElem, hashtagsInputElem, descriptionInputElem) => {
  hashtagsInput = hashtagsInputElem;
  descriptionInput = descriptionInputElem;

  const pristine = new Pristine(formElem, pristineConfig.settings, pristineConfig.isLiveValidation);

  pristine.addValidator(hashtagsInput, validateHashtags, getCurrentHashtagErrors);
  pristine.addValidator(descriptionInput, validateDescription, ValidationErrorMessages.TOO_LONG_COMMENT);

  return pristine.validate;
};
