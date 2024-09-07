const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  POST_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, {method, body});
  return response.ok ? await response.json() : Promise.reject(`${response.status} ${response.statusText}`);
};

export const getPhotoData = async (onSuccess, onFailure) => {
  try {
    const data = await load(Route.GET_DATA);
    onSuccess(data);
  } catch (error) {
    onFailure(error);
  }
};

export const postFormData = async (data, onSuccess, onFailure, setSubmitButtonDisabled) => {
  setSubmitButtonDisabled(true);
  try {
    await load(Route.POST_DATA, Method.POST, data);
    onSuccess();
  } catch {
    onFailure();
  } finally {
    setSubmitButtonDisabled(false);
  }
};
