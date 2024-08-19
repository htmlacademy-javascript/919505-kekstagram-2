import {COMMENTS_STEP} from '../const.js';

const commentTemplate = document.querySelector('.social__comment').cloneNode(true);
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
const createCommentsFragment = (data) => {
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

