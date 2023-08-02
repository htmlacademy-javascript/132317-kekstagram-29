import {onDocumentKeydown} from './form.js';

// Шаблоны сообщений об успешной загрузке/ошибке
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Сообщение об успешной отправке/ошибке
const successModal = successTemplate.cloneNode(true);
const errorModal = errorTemplate.cloneNode(true);

// Функция-обработчик нажатия ESC
function isEscPress(evt, cb) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    cb();
  }
}

// При клике по кнопке закрытия сообщения
const onSuccessCloseButtonClick = () => {
  closeSuccessMessage();
};

const onErrorCloseButtonClick = () => {
  closeErrorMessage();
};

// При клике в любой точке страницы
const onSuccessDocumentClick = (evt) => {
  evt.preventDefault();

  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
};

const onErrorDocumentClick = (evt) => {
  evt.preventDefault();

  if (!evt.target.closest('.error__inner')) {
    closeErrorMessage();
  }
};

// При нажатии ESC
const onErrorDocumentKeydown = (evt) => isEscPress(evt, closeErrorMessage);
const onSuccessDocumentKeydown = (evt) => isEscPress(evt, closeSuccessMessage);


// Показ сообщения об успешной загрузке
const showSuccessMessage = () => {
  document.body.append(successModal);

  successModal.querySelector('.success__button').addEventListener('click', onSuccessCloseButtonClick);
  document.addEventListener('click', onSuccessDocumentClick);
  document.addEventListener('keydown', onSuccessDocumentKeydown);
};

// Закрытие сообщения об успешной загрузке
function closeSuccessMessage() {
  document.body.querySelector('.success').remove();

  document.removeEventListener('click', onSuccessDocumentClick);
  document.removeEventListener('keydown', onSuccessDocumentKeydown);
}

// Показ сообщения об ошибке
const showErrorMessage = () => {
  document.body.append(errorModal);

  errorModal.querySelector('.error__button').addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('click', onErrorDocumentClick);
  document.addEventListener('keydown', onErrorDocumentKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Закрытие сообщения об ошибке
function closeErrorMessage() {
  document.body.querySelector('.error').remove();

  document.removeEventListener('click', onErrorDocumentClick);
  document.removeEventListener('keydown', onErrorDocumentKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
}

export{showErrorMessage,showSuccessMessage};
