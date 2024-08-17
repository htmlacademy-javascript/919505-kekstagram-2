const thumbnailTemplate = document.querySelector('#picture').content;

// Создает превьюшку для последующего рендера
export const createThumbnail = (data) => {
  const {id, url, description, likes, comments} = data;

  const newThumbnail = thumbnailTemplate.cloneNode(true);
  const hrefElement = newThumbnail.querySelector('a');
  const imgElement = newThumbnail.querySelector('.picture__img');
  const likesElement = newThumbnail.querySelector('.picture__likes');
  const commentsElement = newThumbnail.querySelector('.picture__comments');

  hrefElement.dataset.userId = id;
  imgElement.src = url;
  imgElement.alt = description;
  likesElement.textContent = likes;
  commentsElement.textContent = comments.length;

  return newThumbnail;
};
