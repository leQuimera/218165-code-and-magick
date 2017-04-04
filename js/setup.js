// Файл setup.js
'use strict';

var wizardName = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var wizardFamily = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var numberOfWizards = 4;
var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// Получение случайного индекса для массива (массив)
var getRandomInt = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Заполнение массива wizard случайно собранными магами
// (кол-во магов, Имена, Фамилии, цвет мантий, цвет глаз)
var createWizardMatrix = function (packOfWizards, arrayName, arrayFamily, arrayCoat, arrayEyes) {
  var innerArray = [];

  for (var i = 0; i < packOfWizards; i++) {
    innerArray[i] = {};
    innerArray[i].name = arrayName[getRandomInt(arrayName)] + ' ' + arrayFamily[getRandomInt(arrayFamily)];
    innerArray[i].eyes = arrayEyes[getRandomInt(arrayEyes)];
    innerArray[i].coat = arrayCoat[getRandomInt(arrayCoat)];
  }
  return innerArray;
};

// Отрисовка мага по заданным данным
var showWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  var setupSimilarLabel = wizardElement.querySelector('.setup-similar-label');
  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  var wizardEyes = wizardElement.querySelector('.wizard-eyes');

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
userDialog.classList.remove('hidden');
var wizards = createWizardMatrix(numberOfWizards, wizardName, wizardFamily, coatColor, eyesColor);
similarListElement.appendChild(setFragment(wizards));
document.querySelector('.setup-similar').classList.remove('hidden');
