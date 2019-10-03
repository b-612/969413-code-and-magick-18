'use strict';

(function () {
  var HOW_MANY_CHARACTERS = 4;
  window.СharactersParams = {
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

  var similarCharacters = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');
  var similarCharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  var getCharacter = function (characterParams) {
    var character = {
      name: characterParams.WIZARD_NAMES[window.util.getRandomNumber(characterParams.WIZARD_NAMES.length - 1)] + ' ' + characterParams.WIZARD_LAST_NAMES[window.util.getRandomNumber(characterParams.WIZARD_LAST_NAMES.length - 1)],

      coatColor: characterParams.COAT_COLORS[window.util.getRandomNumber(characterParams.COAT_COLORS.length - 1)],

      eyesColor: characterParams.EYES_COLORS[window.util.getRandomNumber(characterParams.EYES_COLORS.length - 1)]
    };

    return character;
  };

  var makeCharacter = function () {
    var characters = [];

    for (var i = 0; i < HOW_MANY_CHARACTERS; i++) {
      characters.push(getCharacter(window.СharactersParams));
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
      fragment.appendChild(renderCharacters(makeCharacter(window.СharactersParams)));
    }

    similarList.appendChild(fragment);
  };

  var addSimilarCharacters = function () {
    renderFragment();
    similarCharacters.classList.remove('hidden');
  };

  addSimilarCharacters();
})();
