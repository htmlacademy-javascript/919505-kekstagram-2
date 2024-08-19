const commentTemplate = document.querySelector('.social__comment').cloneNode(true);

// Создает ноду комментария для последующего рендера
export const createComment = (data) => {
  const {avatar, name, message} = data;

  const newComment = commentTemplate.cloneNode(true);
  const imgElement = newComment.querySelector('.social__picture');
  const textElement = newComment.querySelector('.social__text');

  imgElement.src = avatar;
  imgElement.alt = name;
  textElement.textContent = message;

  return newComment;
};
