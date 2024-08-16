import {generatePhotosData} from './data/photos.js';
import {renderThumbnailList} from './components/thumbnail-list.js';
import {initThumbnail} from './components/thumbnail-item.js';
import {openPhotoCard} from './components/photo-card.js';

// Собираем данные фотографий в объект
const photosData = generatePhotosData();

// Рендерим превьюшки
renderThumbnailList(photosData);

// Оживляем отрендеренные превьюшки
const thumbnails = document.querySelectorAll('.picture');
thumbnails.forEach((thumbnail) => initThumbnail(thumbnail, openPhotoCard));
