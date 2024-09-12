const commentTemplate = document.querySelector('.social__comment').cloneNode(true);

// Создает ноду комментария для последующего рендера
export const createComment = (data) => {
  const {avatar, name, message} = data;

  const newComment = commentTemplate.cloneNode(true);
  const image = newComment.querySelector('.social__picture');
  const textContainer = newComment.querySelector('.social__text');

  image.src = avatar;
  image.alt = name;
  textContainer.textContent = message;

  return newComment;
};
