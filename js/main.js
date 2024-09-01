import {generatePhotosData} from './data/photos.js';
import {initPreviewList} from './components/preview-list.js';
import {initPhotoCard} from './components/photo-card.js';
import {initUploadForm} from './components/form-photo-upload/form.js';

// Собираем данные фотографий в объект
const photosData = generatePhotosData();

//Оживляем карточку фото, получаем коллбэк для её открытия
const openPhotoCardCallback = initPhotoCard();

// Рендерим превьюшки
// Передаем openPhotoCardCallback, который будет вызываться при клике на список превьюшек и открывать карточку фото
initPreviewList(photosData, openPhotoCardCallback);

// Оживляем форму загрузки фото
initUploadForm();
