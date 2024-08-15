import {generatePhotosData} from './data/photos';
import {renderPhotoList} from './components/photo-list';

const photosData = generatePhotosData();

renderPhotoList(photosData);
