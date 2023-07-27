import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

const NUM_OBJECTS = 25;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENTS_COUNT = 30;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;
const NAMES = [
  'Дмитрий',
  'Анна',
  'Евгений',
  'Михаил',
  'Наталья',
  'Владимир',
  'Татьяна',
  'Василий',
  'Мария',
  'Ольга',
  'Рита',
  'Руслан',
];
const COMMENT_EXAMPLES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Как вам моя новая фотография?',
  'Учусь использовать фильтры',
  'А вы так умеете?',
  'Эта фотография заслужила ваешго комментария',
  'Первые шаги',
  'Мое настроение сейчас',
  'Очередное фото моего блога',
];

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from(
  {length: getRandomInteger(1, 2)},
  () => getRandomArrayElement(COMMENT_EXAMPLES),
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN, LIKE_MAX),
  comments: Array.from(
    {length: getRandomInteger(0, COMMENTS_COUNT)},
    createComment,
  ),
});

const getPictures = () => Array.from(
  {length: NUM_OBJECTS},
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

getPictures ();
