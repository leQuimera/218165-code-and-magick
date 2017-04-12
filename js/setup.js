// Файл setup.js
'use strict';

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var numberOfWizards = 4;
var ESCAPE_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

// Получение случайного индекса для массива (массив)
var getRandomInt = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Заполнение массива wizard случайно собранными магами
// (кол-во магов, Имена, Фамилии, цвет мантий, цвет глаз)
var createWizardMatrix = function (packOfWizards, arrayName, arraySurname, arrayCoat, arrayEyes) {
  var innerArray = [];

  for (var i = 0; i < packOfWizards; i++) {
    innerArray[i] = {};
    innerArray[i].name = arrayName[getRandomInt(arrayName)] + ' ' + arraySurname[getRandomInt(arraySurname)];
    innerArray[i].eyes = arrayEyes[getRandomInt(arrayEyes)];
    innerArray[i].coat = arrayCoat[getRandomInt(arrayCoat)];
  }
  return innerArray;
};

// Отрисовка мага по заданным данным
var showWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardElement = similarWizardTemplate.cloneNode(true);
  var similarItem = wizardElement.querySelector('.setup-similar-item');
  var setupSimilarLabel = wizardElement.querySelector('.setup-similar-label');
  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  var wizardEyes = wizardElement.querySelector('.wizard-eyes');

  similarItem.setAttribute('style', 'width: 185px;');
  setupSimilarLabel.textContent = wizard.name;
  wizardCoat.style.fill = wizard.coat;
  wizardEyes.style.fill = wizard.eyes;
  return wizardElement;
};

// Создаем фрагмент для вставки
var setFragment = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(showWizard(array[i])); // appendChild вставка элементов внутрь fragment
  }
  return fragment;
};

// Создание окна с похожими магами
var createWizards = function () {
  var similarListElement = document.querySelector('.setup-similar-list');
  var wizards = createWizardMatrix(numberOfWizards, wizardNames, wizardSurnames, coatColors, eyesColors);
  similarListElement.appendChild(setFragment(wizards));
  document.querySelector('.setup-similar').classList.remove('hidden');
};

// Изменение внешности мага
var wizardRecolor = function () {
  var setupPlayer = document.querySelector('.setup-player');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var wizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');

// Функция смены цвета по клику
<<<<<<< HEAD
  // Проверяем, есть ли событие
  var isClicked = function (keyEvt) {
    return keyEvt && keyEvt.keyCode !== 'undefined';
  };

// Обработчики для смены цвета мантии/глаз/файербола
  var getCoatRandomColor = function (evt) {
    if (isClicked(evt)) {
      wizardCoat.style.fill = coatColors[getRandomInt(coatColors)];
    }
  };

  var getEyesRandomColor = function (evt) {
    if (isClicked(evt)) {
      wizardEyes.style.fill = eyesColors[getRandomInt(eyesColors)];
    }
  };

  var getFireRandomColor = function (evt) {
    if (isClicked(evt)) {
      wizardFireball.style.background = fireColors[getRandomInt(fireColors)];
    }
  };

  wizardCoat.addEventListener('click', getCoatRandomColor);
  wizardEyes.addEventListener('click', getEyesRandomColor);
  wizardFireball.addEventListener('click', getFireRandomColor);
};

=======
  var getRandomColor = function (evt) {
    if (evt.srcElement.className.baseVal === 'wizard-coat') {
      evt.srcElement.style.fill = coatColors[getRandomInt(coatColors)];
    }
    if (evt.srcElement.className.baseVal === 'wizard-eyes') {
      evt.srcElement.style.fill = eyesColors[getRandomInt(eyesColors)];
    }
    if (evt.target.parentNode.className === 'setup-fireball-wrap') {
      evt.target.parentNode.style.background = fireColors[getRandomInt(fireColors)];
    }
  };

  wizardCoat.addEventListener('click', getRandomColor);
  wizardEyes.addEventListener('click', getRandomColor);
  wizardFireball.addEventListener('click', getRandomColor);
};

>>>>>>> 0f361cdc2d03337930f701a001b9f32d80ccde53
// Взаимодействие с окном пользователя
var showUserWindow = function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupSubmit = setup.querySelector('.setup-submit');

  setupUserName.setAttribute('required', 'required');
  setupUserName.setAttribute('maxlength', 50);

  var isEscapePressed = function (keyEvt) {
    return keyEvt && keyEvt.keyCode === ESCAPE_KEY_CODE;
  };

  var isEnterPressed = function (keyEvt) {
    return keyEvt && keyEvt.keyCode === ENTER_KEY_CODE;
  };

  // Открытие окна по esc
  var onPopupEscPress = function (evt) {
    if (isEscapePressed(evt.keyCode)) {
      closePopup();
    }
  };

  var onPopupEntrerPress = function (evt) {
    if (isEnterPressed(evt)) {
      switch (evt.target.className) {
        case 'setup-open-icon':
          openPopup();
          break;
        case 'setup-close':
          closePopup();
          break;
      }
    }
  };

  // Проверка существования магов в блоке "Похожие" и очистка списка магов, если он уже был создан
  var validateWizards = function () {
    var similarListElement = document.querySelector('.setup-similar-list');
    if (similarListElement.children.length) {
      while (similarListElement.firstChild) {
        similarListElement.removeChild(similarListElement.firstChild);
      }
    }
  };

  // Открытие окна
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    validateWizards();
    createWizards();
    wizardRecolor();
  };

  // Закрытие окна
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

<<<<<<< HEAD
  var stopOpening = function (evt) {
    closePopup();
  };

  var closebyButton = function () {
    setupSubmit.addEventListener('submit', stopOpening);
=======
  var closebyButton = function () {
    closePopup();
>>>>>>> 0f361cdc2d03337930f701a001b9f32d80ccde53
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', onPopupEntrerPress);
  setupSubmit.addEventListener('click', closebyButton);
  setupClose.addEventListener('keydown', onPopupEntrerPress);
  setupClose.addEventListener('click', closePopup);
};

showUserWindow();
