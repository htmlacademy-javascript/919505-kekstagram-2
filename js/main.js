import {getPhotoData} from './api.js';
import {initPreviewFilter, getNewDataForFilter} from './components/preview-filter.js';
import {initPreviewList, refreshPreviews} from './components/preview-list.js';
import {initUploadForm} from './components/form-photo-upload/form.js';
import {openModal as openErrorModal} from './components/modals/previews-download-error.js';

initPreviewFilter(refreshPreviews);

// Коллбэк, который, в случае успешного получения фотографий, рендерит превьюшки и оживляет фильтр для них
const handleSuccessPhotoData = (photoData) => {
  initPreviewList(photoData);
  getNewDataForFilter(photoData);
};

// Получаем данные о фото с сервера
void getPhotoData(handleSuccessPhotoData, openErrorModal);

// Оживляем форму загрузки фото
initUploadForm();
