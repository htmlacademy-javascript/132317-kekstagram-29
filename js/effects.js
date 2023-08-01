const sliderEffects = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const effectValueElement = modalElement.querySelector('.effect-level__value');
const sliderEffectsList = modalElement.querySelector('.effects__list');

//функция по изменению фильтров слайдера
const changeSliderFilters = (effect, value, unit = '') => {
  effectValueElement.value = value;
  imageElement.style.filter = `${effect}(${value}${unit})`;
};

//функция отображения слайдера
const showSlider = (effects) => {
  sliderContainerElement.classList.remove('hidden');
  noUiSlider.create(sliderElement, {
    start: effects.max,
    step: effects.step,
    connect: 'lower',
    range: {
      min: effects.min,
      max: effects.max
    },
  });
  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    changeSliderFilters(effects.name, sliderValue, effects.unit);
  });
};

//сброс эффектов фильтра
const resetSliderEffects = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  sliderContainerElement.classList.add('hidden');
  imageElement.style.filter = '';
  effectValueElement.value = '';
};

const onChangeEffect = (evt) => {
  resetSliderEffects();
  const effects = sliderEffects[evt.target.value];
  if (effects.name !== 'none') {
    showSlider(effects);
  }
};

//Функция для запуска работы кнопок масштабирования и слайдера
const init = () => sliderEffectsList.addEventListener('change', onChangeEffect);

//Функция возвращающая размер фото и значение фильтра по умолчанию
const reset = () => {
  resetSliderEffects();
  sliderEffectsList.removeEventListener('change', onChangeEffect);
};

export {init, reset};
