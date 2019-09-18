'use strict';

var HOW_MANY_CHARACTERS = 4;
var charactersParams = {
  wizardNames: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  wizardLastNames: [
    'Фамилии',
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  coatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  eyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * (maxNumber + 1));
};

var showSettingsWindow = function () {
  var playerSettings = document.querySelector('.setup');
  playerSettings.classList.remove('hidden');
};

var makeCharacter = function (characterParams) {
  var character = {
    name: characterParams.wizardNames[getRandomNumber(characterParams.wizardNames.length - 1)] + ' ' + characterParams.wizardLastNames[getRandomNumber(characterParams.wizardLastNames.length - 1)],

    coatColor: characterParams.coatColors[getRandomNumber(characterParams.coatColors.length - 1)],

    eyesColor: characterParams.eyesColors[getRandomNumber(characterParams.eyesColors.length - 1)]
  };

  return character;
};

var makeCharacters = function () {
  var characters = [];

  for (var i = 0; i < HOW_MANY_CHARACTERS; i++) {
    characters.push(makeCharacter(charactersParams));
  }

  return characters;
};

var addSimilarCharacters = function (characters) {
  var similarCharacters = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');
  var similarCharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderCharacter = function () {
    var characterElement = similarCharacterTemplate.cloneNode(true);
    var characterNameElement = characterElement.querySelector('.setup-similar-label');
    var characterCoatElement = characterElement.querySelector('.wizard-coat');
    var characterEyesElement = characterElement.querySelector('.wizard-eyes');

    characterNameElement.textContent = characters[i].name;
    characterCoatElement.style.fill = characters[i].coatColor;
    characterEyesElement.style.fill = characters[i].eyesColor;

    return characterElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < characters.length; i++) {
    fragment.appendChild(renderCharacter());
  }

  similarList.appendChild(fragment);
  similarCharacters.classList.remove('hidden');
};

var showPlayerSettings = function (characterParams, howManyCharacters) {
  showSettingsWindow();
  addSimilarCharacters(makeCharacters(characterParams, howManyCharacters));
};

showPlayerSettings(charactersParams, HOW_MANY_CHARACTERS);
