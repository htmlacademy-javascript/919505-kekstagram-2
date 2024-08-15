import {generatePhotosData} from './data/photos.js';
import {renderPhotoList} from './components/photo-list.js';

const photosData = generatePhotosData();

renderPhotoList(photosData);
