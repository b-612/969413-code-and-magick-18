'use strict';

(function () {
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

  var similarCharacters = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');
  var similarCharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  var getCharacter = function (characterParams) {
    var character = {
      name: characterParams.name,
      coatColor: characterParams.colorCoat,
      eyesColor: characterParams.colorEyes
    };

    return character;
  };

  var makeCharacter = function (charactersParams) {
    // debugger;
    var characters = [];

    for (var i = 0; i < HOW_MANY_CHARACTERS; i++) {
      characters.push(getCharacter(charactersParams[i]));
    }

    return characters;
  };

  var renderCharacter = function (character, i) {
    var characterElement = similarCharacterTemplate.cloneNode(true);
    var characterNameElement = characterElement.querySelector('.setup-similar-label');
    var characterCoatElement = characterElement.querySelector('.wizard-coat');
    var characterEyesElement = characterElement.querySelector('.wizard-eyes');

    characterNameElement.textContent = character[i].name;
    characterCoatElement.style.fill = character[i].coatColor;
    characterEyesElement.style.fill = character[i].eyesColor;

    return characterElement;
  };

  var renderFragment = function (allCharacters) {
    for (var i = 0; i < HOW_MANY_CHARACTERS; i++) {
      var character = makeCharacter(allCharacters);
      fragment.appendChild(renderCharacter(character, i));
    }

    similarList.appendChild(fragment);
  };

  var addSimilarCharacters = function (characters) {
    renderFragment(characters);
    similarCharacters.classList.remove('hidden');
  };

  window.charactersParams = {
    mockParams: СharactersParams,
    addSimilarCharacters: addSimilarCharacters
  };
})();
