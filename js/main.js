import {generatePhotosData} from './data/photos.js';
import {renderThumbnails, initThumbnailList} from './components/thumbnail-list.js';
import {openPhotoCard} from './components/photo-card.js';

// Собираем данные фотографий в объект
const photosData = generatePhotosData();

// Рендерим превьюшки
renderThumbnails(photosData);

// Оживляем превюшки через делегирование
// Передаем коллбэк openPhotoCard, который будет вызываться при клике на список превьюшек
initThumbnailList(photosData, openPhotoCard);
