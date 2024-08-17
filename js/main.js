import {generatePhotosData} from './data/photos.js';
import {renderThumbnailList} from './components/thumbnail-list.js';
import {initThumbnail} from './components/thumbnail-item.js';
import {openPhotoCard} from './components/photo-card.js';

// Собираем данные фотографий в объект
const photosData = generatePhotosData();

// Рендерим превьюшки
renderThumbnailList(photosData);

// Оживляем отрендеренные превьюшки
// В данном случае это будет вызов коллбэка openPhotoCard при клике на превьюшку
const thumbnails = document.querySelectorAll('.picture');
thumbnails.forEach((thumbnail, i) => initThumbnail(thumbnail, photosData[i], openPhotoCard));
