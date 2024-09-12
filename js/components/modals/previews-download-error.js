const MODAL_CLOSE_TIMER = 5000;

export const openModal = (message) => {
  const template = document.querySelector('#data-error').content;
  const clonedModal = template.cloneNode(true);
  document.body.appendChild(clonedModal);

  const modalElement = document.querySelector('.data-error');
  const titleElement = modalElement.querySelector('.data-error__title');

  titleElement.textContent = message;
  setTimeout(() => modalElement.remove(), MODAL_CLOSE_TIMER);
};
