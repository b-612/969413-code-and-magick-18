'use strict';

(function () {
  var dialog = document.querySelector('.setup');
  var startCoords = dialog.getAttribute('style');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = dialog.querySelector('.setup-close');
  var settingsUserName = dialog.querySelector('.setup-user-name');
  var myCharacterCoat = dialog.querySelector('.wizard-coat');
  var coatInput = dialog.querySelector('input[name = coat-color]');
  var myCharacterEyes = dialog.querySelector('.wizard-eyes');
  var eyesInput = dialog.querySelector('input[name = eyes-color]');
  var myCharacterFireball = dialog.querySelector('.setup-fireball-wrap');

  var onSettingsWindowEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      hideSettingsWindow();
    }
  };

  var showSettingsWindow = function () {
    dialog.setAttribute('tabindex', '1');
    dialog.classList.remove('hidden');
    dialog.focus();
    document.addEventListener('keydown', onSettingsWindowEscPress);
  };

  var hideSettingsWindow = function () {
    dialog.classList.add('hidden');
    dialog.setAttribute('style', startCoords);
    dialog.removeAttribute('tabindex');
    document.removeEventListener('keydown', onSettingsWindowEscPress);
  };

  var addSetupOpenCallbacks = function () {
    setupOpen.addEventListener('click', showSettingsWindow);
    setupOpen.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        showSettingsWindow();
      }
    });
  };

  addSetupOpenCallbacks();

  var addSetupCloseCallbacks = function () {
    setupClose.addEventListener('click', hideSettingsWindow);
    setupClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        hideSettingsWindow();
      }
    });
  };

  addSetupCloseCallbacks();

  settingsUserName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  var onElementColorClick = function (element, array, input) {
    return function () {
      var currentColor = array[window.util.getRandomNumber(array.length - 1)];

      element.setAttribute('style', 'fill:' + currentColor);
      input.setAttribute('value', currentColor);
    };
  };

  var onFireballSetColor = function () {
    var fireballColor = window.charactersParams.FIREBALL_COLORS[window.util.getRandomNumber(window.charactersParams.FIREBALL_COLORS.length - 1)];
    var fireballHiddenInput = myCharacterFireball.querySelector('input[name = fireball-color]');

    myCharacterFireball.setAttribute('style', 'background-color:' + fireballColor);
    fireballHiddenInput.setAttribute('value', fireballColor);
  };

  var addCharacterCallback = function () {
    myCharacterCoat.addEventListener('click', onElementColorClick(myCharacterCoat, window.charactersParams.COAT_COLORS, coatInput));
    myCharacterEyes.addEventListener('click', onElementColorClick(myCharacterEyes, window.charactersParams.EYES_COLORS, eyesInput));
    myCharacterFireball.addEventListener('click', onFireballSetColor);
  };

  addCharacterCallback();

  window.setup = {
    dialog: dialog
  };
})();
