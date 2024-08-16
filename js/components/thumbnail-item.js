const photoTemplate = document.querySelector('#picture').content;

// Создает превьюшку для последующего рендера
export const createThumbnail = (data) => {
  const {url, description, likes, comments} = data;

  const newThumbnail = photoTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;

  return newThumbnail;
};

// Оживляет отрендеренную превьюшку
export const initThumbnail = (thumbnail, callback) => {
  const url = thumbnail.querySelector('.picture__img').src;
  const likes = thumbnail.querySelector('.picture__likes').textContent;
  const totalCommentsCount = thumbnail.querySelector('.picture__comments').textContent;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    callback({url, likes, totalCommentsCount});
  });
};
