const shownCommentsElement = document.querySelector('.social__comment-shown-count');
const totalCommentsElement = document.querySelector('.social__comment-total-count');

// Обновляет число показанных комментариев,
export const updateCommentPanel = (areAllCommentsShown, currentShownComments, totalComments) => {
  totalCommentsElement.textContent = totalComments.toString();

  areAllCommentsShown
    ? shownCommentsElement.textContent = totalComments.toString()
    : shownCommentsElement.textContent = currentShownComments.toString();
};
