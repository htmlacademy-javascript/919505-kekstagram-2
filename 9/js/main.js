import {generatePhotosData} from './data/photos.js';
import {renderThumbnailList} from './components/thumbnail-list.js';

const photosData = generatePhotosData();

renderThumbnailList(photosData);
