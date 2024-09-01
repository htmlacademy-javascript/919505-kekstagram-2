import {generatePhotosData} from './data/photos.js';
import {initPreviewList} from './components/preview-list.js';
import {initPhotoCard, openPhotoCard} from './components/photo-card.js';
import {initUploadForm} from './components/form-photo-upload/form.js';

// Собираем данные фотографий в объект
const photosData = generatePhotosData();

//Оживляем карточку фото
initPhotoCard();

// Рендерим превьюшки
// Передаем коллбэк openPhotoCard, который будет вызываться при клике на список превьюшек
initPreviewList(photosData, openPhotoCard);

// Оживляем форму загрузки фото
initUploadForm();
