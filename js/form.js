import {
  init as initEffects,
  reset as resetEffects
} from './effects.js';
import {resetScale} from './scale.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTEG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const textOfError = {
  NOT_VALID_TAGS: 'Неправильная форма ввода тегов',
  NOT_VALID_COUNT: `Максимум ${MAX_HASHTEG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Повторение одинаковых хештегов',
  NOT_VALID_LENGTH_COMMENT: 'Длина комментария не должна быть больше 140 символов'
};

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlayForm = form.querySelector('.img-upload__overlay');
const closeForm = form.querySelector('.img-upload__cancel');
const uploadFile = form.querySelector('.img-upload__input');
const textHashtags = form.querySelector('.text__hashtags');
const textComments = form.querySelector('.text__description');

//правила работы для Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//функция нормализация строки, на выходе нормализованный массив тегов.
const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

//проверка строки с хештегами на валдиность по регулярному выражению
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

//проверка на количество хэштегов, тегов не более чила константы MAX_HASHTEG_COUNT
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTEG_COUNT;

//проверка уникальность хэштегов
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//проверка длины комментария поля добавления комментария
const hasValidLength = () => textComments.value.length <= MAX_COMMENT_LENGTH;

//добавление проверки в Pristin на валидность хештегов
pristine.addValidator(
  textHashtags,
  hasValidTags,
  textOfError.NOT_VALID_TAGS,
  2,
  true
);

//добавление проверки в Pristin на количество хештегов
pristine.addValidator(
  textHashtags,
  hasValidCount,
  textOfError.NOT_VALID_COUNT,
  3,
  true
);

//добавление проверки в Pristine на уникальность хештегов
pristine.addValidator(
  textHashtags,
  hasUniqueTags,
  textOfError.NOT_UNIQUE,
  1,
  true
);

//добавление проверки в Pristine на количетво симвовло в полте ввода комменатрия
pristine.addValidator(
  textComments,
  hasValidLength,
  textOfError.NOT_VALID_LENGTH_COMMENT,
  4,
  true
);

//проверка, является ли заданное поле (field) текущим активным элементом на веб-странице
const isFocusField = (field) => document.activeElement === field;

//функция закрытия модального окна
const closeFormModal = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  overlayForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

//функция открытия модального окна
const openFormModal = () => {
  overlayForm.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeForm.addEventListener('click', closeFormModal);
  initEffects();
};

//переименование функции по тсандартам обработчика
const onOpenFormModal = () => {
  openFormModal();
};

// функция для закрытия модального окна по Esc если нету фокуса на полях хэштега и комментариев
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isFocusField(textHashtags) && !isFocusField(textComments)) {
    evt.preventDefault();
    closeFormModal();
  }
};

//открытие модального окна формы
const openModalFormScript = () => {
  uploadFile.addEventListener('change', onOpenFormModal);
};

export {openModalFormScript, onDocumentKeydown};
