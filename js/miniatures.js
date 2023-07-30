import {showBigPicture} from './full-photos.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

function createPictureItem ({url, description, likes, comments}) {
  const pictureItem = template.cloneNode(true);

  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;

  return pictureItem;
}

function fillingListPictures (items) {
  const listPictureFragment = document.createDocumentFragment();

  items.forEach((item) => {
    const picture = createPictureItem(item);

    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(item);
    });

    listPictureFragment.append(picture);
  });

  picturesList.append(listPictureFragment);
}

export {fillingListPictures};
