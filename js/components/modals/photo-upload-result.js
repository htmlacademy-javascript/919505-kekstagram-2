import {KeyCode} from '../../const.js';

let modalElement = null;

const keydownHandler = (evt) => {
  evt.stopPropagation();
  if (evt.key === KeyCode.ESC) {
    closeModal();
  }
};

const modalClickHandler = (evt) => {
  if (evt.target === modalElement) {
    modalElement.remove();
  }
};

const closeButtonHandler = () => {
  closeModal();
};

// Функция не стрелочная, потому что нужен хойстинг
function closeModal () {
  modalElement.remove();
  document.removeEventListener('keydown', keydownHandler);
}

export const openModal = (modalType) => {
  const template = document.querySelector(`#${modalType}`).content;
  const clonedModal = template.cloneNode(true);
  document.body.appendChild(clonedModal);

  modalElement = document.querySelector(`.${modalType}`);
  const closeElement = modalElement.querySelector(`.${modalType}__button`);

  closeElement.addEventListener('click', closeButtonHandler);
  modalElement.addEventListener('click', modalClickHandler);
  document.addEventListener('keydown', keydownHandler);
};
