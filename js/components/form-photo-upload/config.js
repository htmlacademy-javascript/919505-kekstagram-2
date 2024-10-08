export const MAX_HASHTAGS_AMOUNT = 5;
export const MAX_DESCRIPTION_LENGTH = 140;
export const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

export const ValidationErrorMessages = {
  INVALID_HASHTAG: 'введён невалидный хэштег',
  TOO_MANY_HASHTAGS: 'превышено количество хэштегов',
  REPEATED_HASHTAGS: 'хэштеги повторяются',
  TOO_LONG_COMMENT: 'длина комментария больше 140 символов',
};

export const ImgScaleConfig = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  INITIAL_SCALE: 100
};

export const pristineConfig = {
  isLiveValidation: true,

  settings: {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  }
};

export const effectsConfig = {
  initial : {
    range: {
      min: 0,
      max: 1
    },
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
    filter: 'grayscale',
    postfix: '',
    settings: {
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
      start: 1,
    }
  },

  sepia: {
    filter: 'sepia',
    postfix: '',
    settings: {
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
      start: 1,
    },
  },

  marvin:  {
    filter: 'invert',
    postfix: '%',
    settings: {
      range: {
        min: 0,
        max: 100
      },
      step: 1,
      start: 100,
    },
  },

  phobos: {
    filter: 'blur',
    postfix: 'px',
    settings: {
      range: {
        min: 0,
        max: 3
      },
      step: 0.1,
      start: 3,
    },
  },

  heat: {
    filter: 'brightness',
    postfix: '',
    settings: {
      range: {
        min: 1,
        max: 3
      },
      step: 0.1,
      start: 3,
    },
  }
};
