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

var numberOfMags = 4;
var wizards = [];


var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;


// Получений случайного целого числа (минимум, максимум)
function getRandomInt(array) {
  return Math.floor(Math.random() * array.length);
}

// Заполнение массива wizard случайно собранными магами
function creatMagMatrix(setMagics) {
  for (var i = 0; i < setMagics; i++) {
    var iName = getRandomInt(wizardName);
    var iFamily = getRandomInt(wizardFamily);
    var iCoat = getRandomInt(coatColor);
    var iEye = getRandomInt(eyesColor);
    wizards[i] = { };
    wizards[i].name = wizardName[iName] + ' ' + wizardFamily[iFamily];
    wizards[i].eyes = eyesColor[iEye];
    wizards[i].coat = coatColor[iCoat];
  }
  return wizards;
}

// Отрисовка мага по заданным данным
function showWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

  return wizardElement;
}

// Создаем фрагмент для вставки
function setFragment() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(showWizard(wizards[i])); // appendChild вставка элементов внутрь fragment
  }
  return fragment;
}

creatMagMatrix(numberOfMags);
similarListElement.appendChild(setFragment());

document.querySelector('.setup-similar').classList.remove('hidden');
