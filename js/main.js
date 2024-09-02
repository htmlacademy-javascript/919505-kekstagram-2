import {getPhotoData} from './API/backend.js';
import {initPreviewList} from './components/preview-list.js';
import {initUploadForm} from './components/form-photo-upload/form.js';

//Получаем данные о фото с сервера и рендерим превьюшки
getPhotoData(initPreviewList);

// Оживляем форму загрузки фото
initUploadForm();
