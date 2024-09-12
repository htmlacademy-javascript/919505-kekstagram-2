const previewTemplate = document.querySelector('#picture').content;

// Создает превьюшку для последующего рендера
export const createPreview = (data) => {
  const {id, url, description, likes, comments} = data;

  const newPreview = previewTemplate.cloneNode(true);
  const hrefElement = newPreview.querySelector('a');
  const imageElement = newPreview.querySelector('.picture__img');
  const likesElement = newPreview.querySelector('.picture__likes');
  const commentsElement = newPreview.querySelector('.picture__comments');

  hrefElement.dataset.photoId = id;
  imageElement.src = url;
  imageElement.alt = description;
  likesElement.textContent = likes;
  commentsElement.textContent = comments.length;

  return newPreview;
};
