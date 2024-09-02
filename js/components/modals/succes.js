import {KeyCode} from '../../const';

const successTemplate = document.querySelector('#success');
let modal = null;

const keydownHandler = (evt) => {
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

export const openSuccessModal = () => {
  const successModal = successTemplate.content.cloneNode(true);
  document.body.appendChild(successModal);

  modal = document.querySelector('.success');
  const closeButton = document.querySelector('.success__button');

  closeButton.addEventListener('click', closeButtonHandler);
  modal.addEventListener('click', modalClickHandler);
  document.addEventListener('keydown', keydownHandler);
};
