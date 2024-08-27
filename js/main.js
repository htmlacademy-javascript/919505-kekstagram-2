import {generatePhotosData} from './data/photos.js';
import {initPreviewList} from './components/preview-list.js';
import {openPhotoCard} from './components/photo-card.js';
import {initUploadForm} from './components/form-photo-upload/presenter.js';

// Собираем данные фотографий в объект
const photosData = generatePhotosData();

// Рендерим превьюшки
// Передаем коллбэк openPhotoCard, который будет вызываться при клике на список превьюшек
initPreviewList(photosData, openPhotoCard);

// Оживляем форму загрузки фото
initUploadForm();
