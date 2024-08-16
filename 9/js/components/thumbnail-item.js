const photoTemplate = document.querySelector('#picture').content;

export const initThumbnail = (thumbnail, callback) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    callback(thumbnail);
  });
};

export const createThumbnail = (data) => {
  const {url, description, likes, comments} = data;

  const newThumbnail = photoTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;

  return newThumbnail;
};
