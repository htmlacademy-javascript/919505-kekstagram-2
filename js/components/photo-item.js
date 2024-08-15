const photoTemplate = document.querySelector('#picture').content;

export const createPhoto = (data) => {
  const {url, description, likes, comments} = data;

  const newPhoto = photoTemplate.cloneNode(true);
  const imgElement = newPhoto.querySelector('.picture__img');
  const likesElement = newPhoto.querySelector('.picture__likes');
  const commentsElement = newPhoto.querySelector('.picture__comments');

  imgElement.src = url;
  imgElement.alt = description;

  likesElement.textContent = likes;
  commentsElement.textContent = comments.length;

  return newPhoto;
};
