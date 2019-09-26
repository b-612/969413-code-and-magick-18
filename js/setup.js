'use strict';

var HOW_MANY_CHARACTERS = 4;
var СharactersParams = {
  WIZARD_NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  WIZARD_LAST_NAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  COAT_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  EYES_COLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],

  FIREBALL_COLORS: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

var playerSettings = document.querySelector('.setup');
var similarCharacters = document.querySelector('.setup-similar');
var similarList = document.querySelector('.setup-similar-list');
var similarCharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * (maxNumber + 1));
};

var makeCharacter = function (characterParams) {
  var character = {
    name: characterParams.WIZARD_NAMES[getRandomNumber(characterParams.WIZARD_NAMES.length - 1)] + ' ' + characterParams.WIZARD_LAST_NAMES[getRandomNumber(characterParams.WIZARD_LAST_NAMES.length - 1)],

    coatColor: characterParams.COAT_COLORS[getRandomNumber(characterParams.COAT_COLORS.length - 1)],

    eyesColor: characterParams.EYES_COLORS[getRandomNumber(characterParams.EYES_COLORS.length - 1)]
  };

  return character;
};

var makeCharacters = function () {
  var characters = [];

  for (var i = 0; i < HOW_MANY_CHARACTERS; i++) {
    characters.push(makeCharacter(СharactersParams));
  }

  return characters;
};

var renderCharacters = function (characters) {
  var characterElement = similarCharacterTemplate.cloneNode(true);
  var characterNameElement = characterElement.querySelector('.setup-similar-label');
  var characterCoatElement = characterElement.querySelector('.wizard-coat');
  var characterEyesElement = characterElement.querySelector('.wizard-eyes');

  for (var i = 0; i < HOW_MANY_CHARACTERS; i++) {
    characterNameElement.textContent = characters[i].name;
    characterCoatElement.style.fill = characters[i].coatColor;
    characterEyesElement.style.fill = characters[i].eyesColor;
  }

  return characterElement;
};

var renderFragment = function () {
  for (var i = 0; i < HOW_MANY_CHARACTERS; i++) {
    fragment.appendChild(renderCharacters(makeCharacters(СharactersParams)));
  }

  similarList.appendChild(fragment);
};

var addSimilarCharacters = function () {
  renderFragment();
  similarCharacters.classList.remove('hidden');
};

var showPlayerSettings = function () {
  addSimilarCharacters();
};

showPlayerSettings();

/* module4-task1 */
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
// var SPACE_KEYCODE = 32;

var setupOpen = document.querySelector('.setup-open');
var setupClose = playerSettings.querySelector('.setup-close');
var settingsUserName = playerSettings.querySelector('.setup-user-name');
var myCharacterCoat = playerSettings.querySelector('.wizard-coat');
var coatInput = playerSettings.querySelector('input[name = coat-color]');
var myCharacterEyes = playerSettings.querySelector('.wizard-eyes');
var eyesInput = playerSettings.querySelector('input[name = eyes-color]');
var myCharacterFireball = playerSettings.querySelector('.setup-fireball-wrap');

var onSettinsWindowEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideSettingsWindow();
  }
};

var showSettingsWindow = function () {
  playerSettings.setAttribute('tabindex', '1');
  playerSettings.classList.remove('hidden');
  playerSettings.focus();
  document.addEventListener('keydown', onSettinsWindowEscPress);
};

var hideSettingsWindow = function () {
  playerSettings.classList.add('hidden');
  playerSettings.removeAttribute('tabindex');
  document.removeEventListener('keydown', onSettinsWindowEscPress);
};

setupOpen.addEventListener('click', showSettingsWindow);
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showSettingsWindow();
  }
});

setupClose.addEventListener('click', hideSettingsWindow);
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideSettingsWindow();
  }
});

settingsUserName.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

var onElementSetColor = function (element, array, input) {
  return function () {
    var currentColor = array[getRandomNumber(array.length - 1)];

    element.setAttribute('style', 'fill:' + currentColor);
    input.setAttribute('value', currentColor);
  };
};

var onFireballSetColor = function () {
  var fireballColor = СharactersParams.FIREBALL_COLORS[getRandomNumber(СharactersParams.FIREBALL_COLORS.length - 1)];
  var fireballHiddenInput = myCharacterFireball.querySelector('input[name = fireball-color]');

  myCharacterFireball.setAttribute('style', 'background-color:' + fireballColor);
  fireballHiddenInput.setAttribute('value', fireballColor);
};

myCharacterCoat.addEventListener('click', onElementSetColor(myCharacterCoat, СharactersParams.COAT_COLORS, coatInput));
myCharacterEyes.addEventListener('click', onElementSetColor(myCharacterEyes, СharactersParams.EYES_COLORS, eyesInput));
myCharacterFireball.addEventListener('click', onFireballSetColor);
