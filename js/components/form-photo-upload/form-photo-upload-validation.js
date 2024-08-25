const MAX_HASHTAGS_AMOUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const validationErrorMessages = {
  invalidHashtag: 'введён невалидный хэштег',
  tooManyHashtags: 'превышено количество хэштегов',
  repeatedHashtags: 'хэштеги повторяются',
  tooLongComment: 'длина комментария больше 140 символов',
};

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

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
    addHashtagError(validationErrorMessages.tooManyHashtags);
    isValid = false;
  }

  hashtagsArray.forEach((hashtag) => {
    if (!hashtagRegExp.test(hashtag)) {
      addHashtagError(validationErrorMessages.invalidHashtag);
      isValid = false;
    }

    if (hashtagSet.has(hashtag)) {
      addHashtagError(validationErrorMessages.repeatedHashtags);
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

  const pristine = new Pristine(formElem, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  }, true);

  pristine.addValidator(hashtagsInput, validateHashtags, getCurrentHashtagErrors);
  pristine.addValidator(descriptionInput, validateDescription, validationErrorMessages.tooLongComment);

  return pristine.validate;
};
