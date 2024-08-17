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
const createCommentsFragment = (commentsData) => {
  const commentsFragment = document.createDocumentFragment();

  commentsData.forEach((comment) => {
    const newComment = createComment(comment);
    commentsFragment.appendChild(newComment);
  });

  return commentsFragment;
};

// Удаляет старые комментарии и добавляет фрагмент с новыми
export const updateComments = (comments) => {
  const commentsListElement = document.querySelector('.social__comments');
  const commentsFragment = createCommentsFragment(comments);

  commentsListElement.innerHTML = '';
  commentsListElement.appendChild(commentsFragment);
};
