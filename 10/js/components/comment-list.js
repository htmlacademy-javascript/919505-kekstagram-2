import {createComment} from './comment-item.js';
import {updateCommentPanel} from './comment-panel.js';
import {COMMENTS_STEP} from '../const.js';

const commentsLoaderElement = document.querySelector('.comments-loader');
const commentsListElement = document.querySelector('.social__comments');

let commentsData = [];
let currentShownComments = COMMENTS_STEP;

export const createCommentsFragment = (data) => {
  const commentsFragment = document.createDocumentFragment();

  data.forEach((comment) => {
    const newComment = createComment(comment);
    commentsFragment.appendChild(newComment);
  });

  return commentsFragment;
};

const removeComments = () => {
  currentShownComments = COMMENTS_STEP;
  commentsListElement.innerHTML = '';
};

const updateComments = (comments) => {
  const commentsFragment = createCommentsFragment(comments);
  const areAllCommentsShown = currentShownComments >= commentsData.length;

  updateCommentPanel(areAllCommentsShown, currentShownComments, commentsData.length);

  if (areAllCommentsShown) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  commentsListElement.appendChild(commentsFragment);
};

const addCommentsHandler = () => {
  const previousShownComments = currentShownComments;
  const areTotalCommentsReached = currentShownComments + COMMENTS_STEP > commentsData.length;

  if (areTotalCommentsReached) {
    currentShownComments = commentsData.length;
  } else {
    currentShownComments += COMMENTS_STEP;
  }

  updateComments(commentsData.slice(previousShownComments, currentShownComments));
};

export const initComments = (data) => {
  commentsData = data;

  removeComments();
  updateComments(commentsData.slice(0, COMMENTS_STEP));

  commentsLoaderElement.addEventListener('click', addCommentsHandler);
};

export const closeComments = () => {
  commentsLoaderElement.removeEventListener('click', addCommentsHandler);
  removeComments();
};
