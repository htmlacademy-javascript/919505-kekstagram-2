const MODAL_CLOSE_TIMER = 5000;

export const openModal = (message) => {
  const template = document.querySelector('#data-error');
  const clonedModal = template.content.cloneNode(true);
  document.body.appendChild(clonedModal);

  const modal = document.querySelector('.data-error');
  const title = modal.querySelector('.data-error__title');

  title.textContent = message;
  setTimeout(() => modal.remove(), MODAL_CLOSE_TIMER);
};
