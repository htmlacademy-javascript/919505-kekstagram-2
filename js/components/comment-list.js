import {createCommentsFragment} from './comment-item';
import {COMMENTS_STEP} from '../const.js';

const commentsListElement = document.querySelector('.social__comments');
const shownCommentsElement = document.querySelector('.social__comment-shown-count');
const totalCommentsElement = document.querySelector('.social__comment-total-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

let commentsData = [];
let currentShownComments = COMMENTS_STEP;

// Обновляет число показанных комментариев,
// прячет кнопку подгрузки комментариев, если больше показывать нечего
const updateCommentPanel = () => {
  if (currentShownComments >= commentsData.length) {
    shownCommentsElement.textContent = commentsData.length.toString();
    commentsLoaderElement.classList.add('hidden');
  } else {
    shownCommentsElement.textContent = currentShownComments.toString();
    commentsLoaderElement.classList.remove('hidden');
  }
};

const removeComments = () => {
  currentShownComments = COMMENTS_STEP;
  commentsListElement.innerHTML = '';
};

const updateComments = (comments) => {
  const commentsFragment = createCommentsFragment(comments);
  commentsListElement.appendChild(commentsFragment);

  updateCommentPanel();
};

const addCommentsHandler = () => {
  const previousShownComments = currentShownComments;

  if (currentShownComments + COMMENTS_STEP > commentsData.length) {
    currentShownComments = commentsData.length;
  } else {
    currentShownComments += COMMENTS_STEP;
  }

  updateComments(commentsData.slice(previousShownComments, currentShownComments));
};

export const initComments = (data) => {
  commentsData = data;

  totalCommentsElement.textContent = commentsData.length.toString();

  removeComments();
  updateComments(commentsData.slice(0, COMMENTS_STEP));

  commentsLoaderElement.addEventListener('click', addCommentsHandler);
};

export const closeComments = () => {
  commentsLoaderElement.removeEventListener('click', addCommentsHandler);
  removeComments();
};

