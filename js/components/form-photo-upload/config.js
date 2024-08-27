export const MAX_HASHTAGS_AMOUNT = 5;
export const MAX_DESCRIPTION_LENGTH = 140;
export const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

export const ValidationErrorMessages = {
  invalidHashtag: 'введён невалидный хэштег',
  tooManyHashtags: 'превышено количество хэштегов',
  repeatedHashtags: 'хэштеги повторяются',
  tooLongComment: 'длина комментария больше 140 символов',
};

export const ImgScaleConfig = {
  min: 25,
  max: 100,
  step: 25,
  initialScale: 100
};

export const EffectsConfig = {
  initial : {
    range: {min: 0, max: 1},
    start: 0,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  },

  none: 'none',

  chrome: {
    name: 'chrome',
    filter: 'grayscale',
    postfix: '',
    settings: {
      range: {min: 0, max: 1},
      step: 0.1,
      start: 0,
    }
  },

  sepia: {
    name: 'sepia',
    filter: 'sepia',
    postfix: '',
    settings: {
      range: {min: 0, max: 1},
      step: 0.1,
      start: 0,
    },
  },

  marvin:  {
    name: 'marvin',
    filter: 'invert',
    postfix: '%',
    settings: {
      range: {min: 0, max: 100},
      step: 1,
      start: 0,
    },
  },

  phobos: {
    name: 'phobos',
    filter: 'blur',
    postfix: 'px',
    settings: {
      range: {min: 0, max: 3},
      step: 0.1,
      start: 0,
    },
  },

  heat: {
    name: 'heat',
    filter: 'brightness',
    postfix: '',
    settings: {
      range: {min: 1, max: 3},
      step: 0.1,
      start: 1,
    },
  }
};
