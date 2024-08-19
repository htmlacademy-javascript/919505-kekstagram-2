const commentTemplate = document.querySelector('.social__comment').cloneNode(true);

// Создает ноду комментария для последующего рендера
const createComment = (data) => {
  const {avatar, name, message} = data;

  const newComment = commentTemplate.cloneNode(true);
  const imgElement = newComment.querySelector('.social__picture');
  const textElement = newComment.querySelector('.social__text');

  imgElement.src = avatar;
  imgElement.alt = name;
  textElement.textContent = message;

  return newComment;
};
// Создает фрагмент с комментариями
export const createCommentsFragment = (data) => {
  const commentsFragment = document.createDocumentFragment();

  data.forEach((comment) => {
    const newComment = createComment(comment);
    commentsFragment.appendChild(newComment);
  });

  return commentsFragment;
};
