import {KeyCode} from '../../const';

let modal = null;

const keydownHandler = (evt) => {
  evt.stopPropagation();
  if (evt.key === KeyCode.ESC) {
    closeModal();
  }
};

const modalClickHandler = (evt) => {
  if (evt.target === modal) {
    modal.remove();
  }
};

const closeButtonHandler = () => {
  closeModal();
};

// Функция не стрелочная, потому что нужен хойстинг
function closeModal () {
  modal.remove();
  document.removeEventListener('keydown', keydownHandler);
}

export const openModal = (modalType) => {
  const template = document.querySelector(`#${modalType}`);
  const successModal = template.content.cloneNode(true);
  document.body.appendChild(successModal);

  modal = document.querySelector(`.${modalType}`);
  const closeButton = modal.querySelector(`.${modalType}__button`);

  closeButton.addEventListener('click', closeButtonHandler);
  modal.addEventListener('click', modalClickHandler);
  document.addEventListener('keydown', keydownHandler);
};
