const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data'
};

export const getPhotoData = (onSuccess, onFailure) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photosData) => {
      onSuccess(photosData);
    })
    .catch((err) => {
      onFailure(err.message);
    });
};

export const postNewPhoto = (data, onSuccess, onFailure, setSubmitButtonDisabled) => {
  setSubmitButtonDisabled(true);

  fetch(BASE_URL, {method: 'POST', body: data})
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => onFailure())
    .finally(() => setSubmitButtonDisabled(false));
};
