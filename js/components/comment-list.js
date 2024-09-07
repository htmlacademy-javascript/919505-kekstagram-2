import {createComment} from './comment-item.js';

const COMMENTS_STEP = 5;

const shownCommentsElement = document.querySelector('.social__comment-shown-count');
const totalCommentsElement = document.querySelector('.social__comment-total-count');
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

const addComments = () => {
  const areAllCommentsShown = currentCommentsCount + COMMENTS_STEP >= commentsData.length;
  const newComments = commentsData.slice(currentCommentsCount, currentCommentsCount + COMMENTS_STEP);
  const commentsFragment = createCommentsFragment(newComments);

  currentCommentsCount = areAllCommentsShown ? commentsData.length : currentCommentsCount + COMMENTS_STEP;
  shownCommentsElement.textContent = currentCommentsCount;
  commentsListElement.appendChild(commentsFragment);

  if (areAllCommentsShown) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const addCommentsHandler = () => {
  addComments();
};

export const closeComments = () => {
  currentCommentsCount = 0;
  commentsListElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', addCommentsHandler);
};

export const initComments = (data) => {
  commentsData = data;
  totalCommentsElement.textContent = commentsData.length.toString();

  closeComments();
  addComments();

  commentsLoaderElement.addEventListener('click', addCommentsHandler);
};
