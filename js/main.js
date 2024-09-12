import {getPhotoData} from './api.js';
import {initPreviewFilter, showFilter} from './components/preview-filter.js';
import {initPreviewList, refreshPreviews} from './components/preview-list.js';
import {initUploadForm} from './components/form-photo-upload/form.js';
import {openModal as openErrorModal} from './components/modals/previews-download-error.js';
import {setPhotos} from './store/photos.js';

// Оживляет кнопки фильтра
initPreviewFilter(refreshPreviews);

// Коллбэк, который, в случае успешного получения фотографий, рендерит превьюшки и показывает фильтр
const handleSuccessPhotoData = (photoData) => {
  setPhotos(photoData);
  initPreviewList();
  showFilter();
};

// Получаем данные о фото с сервера
void getPhotoData(handleSuccessPhotoData, openErrorModal);

// Оживляем форму загрузки фото
initUploadForm();
