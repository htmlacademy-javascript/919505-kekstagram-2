import {createComment} from './comment-item.js';
import {updateCommentPanel} from './comment-panel.js';
import {COMMENTS_STEP} from '../const.js';

const commentsLoaderElement = document.querySelector('.comments-loader');
const commentsListElement = document.querySelector('.social__comments');

let commentsData = [];
let currentCommentsCount = 0;

const createCommentsFragment = (data) => {
  const commentsFragment = document.createDocumentFragment();

  data.forEach((comment) => {
    const newComment = createComment(comment);
    commentsFragment.appendChild(newComment);
  });

  return commentsFragment;
};

const addComments = (comments) => {
  const commentsFragment = createCommentsFragment(comments);
  commentsListElement.appendChild(commentsFragment);

  currentCommentsCount += COMMENTS_STEP;

  updateCommentPanel(currentCommentsCount, commentsData.length);

  if (currentCommentsCount >= commentsData.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const addCommentsHandler = () => {
  addComments(commentsData.slice(currentCommentsCount, currentCommentsCount + COMMENTS_STEP));
};

export const closeComments = () => {
  currentCommentsCount = 0;
  commentsListElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', addCommentsHandler);
};

export const initComments = (data) => {
  commentsData = data;

  closeComments();
  addComments(commentsData.slice(0, COMMENTS_STEP));

  commentsLoaderElement.addEventListener('click', addCommentsHandler);
};
