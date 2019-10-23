'use strict';

(function () {
  var getNameRank = function (left, right) {
    switch (true) {
      case left > right :
        return 1;
      case left < right :
        return -1;
      default :
        return 0;
    }
  };

  var getRank = function (character) {
    var rank = 0;

    if (character.colorCoat === window.setup.coatColor) {
      rank += 2;
    }
    if (character.colorEyes === window.setup.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var onColorChange = window.util.debounce(function () {
    window.charactersParams.renderSimilarCharacters(window.backend.characters.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = getNameRank(left.name, right.name);
      }

      return rankDiff;
    }));
  });

  var addChangeColorCallback = function () {
    window.setup.myCharacterCoat.addEventListener('click', onColorChange);
    window.setup.myCharacterEyes.addEventListener('click', onColorChange);
  };

  addChangeColorCallback();

  window.sorting = {
    onColorChange: onColorChange
  };
})();
