// Файл setup.js
'use strict';

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var numberOfWizards = 4;

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

  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = coatColors[getRandomInt(coatColors)];
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = eyesColors[getRandomInt(eyesColors)];
  });

  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.background = fireColors[getRandomInt(fireColors)];
  });
};


// Взаимодействие с окном пользователя
var showUserWindow = function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupSubmit = setup.querySelector('.setup-submit');

  setupUserName.setAttribute('required', 'required');
  setupUserName.setAttribute('maxlength', 50);

  // Открытие окна по esc
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closePopup();
    }
  };

  var onPopupEntrerPress = function (evt) {
    if (evt.keyCode === 13) {
      if (evt.target.className === 'setup-open-icon') {
        openPopup();
      }
      if (evt.target.className === 'setup-close') {
        closePopup();
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

  var closebyButton = function () {
    var quantity = setupUserName.value;
    if (quantity === '' || quantity <= 50) {
      return;
    }
    closePopup();
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', onPopupEntrerPress);
  setupSubmit.addEventListener('click', closebyButton);
  setupClose.addEventListener('keydown', onPopupEntrerPress);
  setupClose.addEventListener('click', closePopup);
};

// Привентивное добавление tabindex к кнопке открытия формы
var addTabIndex = function () {
  var setupIcon = document.querySelector('.setup-open-icon');
  setupIcon.setAttribute('tabindex', 0);
};

addTabIndex();
showUserWindow();
