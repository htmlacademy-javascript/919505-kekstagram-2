const shownCommentsElement = document.querySelector('.social__comment-shown-count');
const totalCommentsElement = document.querySelector('.social__comment-total-count');

// Обновляет число показанных комментариев,
export const updateCommentPanel = (currentCommentsCount, totalComments) => {
  totalCommentsElement.textContent = totalComments.toString();

  if (currentCommentsCount >= totalComments) {
    shownCommentsElement.textContent = totalComments.toString();
  } else {
    shownCommentsElement.textContent = currentCommentsCount.toString();
  }
};
