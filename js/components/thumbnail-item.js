const thumbnailTemplate = document.querySelector('#picture').content;

// Создает превьюшку для последующего рендера
export const createThumbnail = (data) => {
  const {url, description, likes, comments} = data;

  const newThumbnail = thumbnailTemplate.cloneNode(true);
  const imgElement = newThumbnail.querySelector('.picture__img');
  const likesElement = newThumbnail.querySelector('.picture__likes');
  const commentsElement = newThumbnail.querySelector('.picture__comments');

  imgElement.src = url;
  imgElement.alt = description;
  likesElement.textContent = likes;
  commentsElement.textContent = comments.length;

  return newThumbnail;
};

// Оживляет отрендеренную превьюшку
export const initThumbnail = (thumbnail, data, callback) => {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    callback(data);
  });
};
