import {generatePhotosData} from './data/photos.js';
import {renderPreviews, initPreviewList} from './components/preview-list.js';
import {openPhotoCard} from './components/photo-card.js';

// Собираем данные фотографий в объект
const photosData = generatePhotosData();

// Рендерим превьюшки
renderPreviews(photosData);

// Оживляем превьюшки через делегирование
// Передаем коллбэк openPhotoCard, который будет вызываться при клике на список превьюшек
initPreviewList(photosData, openPhotoCard);
