'use strict';

(function () {
  window.playerSettings = {
    dialog: document.querySelector('.setup')
  };

  var startCoords = window.playerSettings.dialog.getAttribute('style');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.playerSettings.dialog.querySelector('.setup-close');
  var settingsUserName = window.playerSettings.dialog.querySelector('.setup-user-name');
  var myCharacterCoat = window.playerSettings.dialog.querySelector('.wizard-coat');
  var coatInput = window.playerSettings.dialog.querySelector('input[name = coat-color]');
  var myCharacterEyes = window.playerSettings.dialog.querySelector('.wizard-eyes');
  var eyesInput = window.playerSettings.dialog.querySelector('input[name = eyes-color]');
  var myCharacterFireball = window.playerSettings.dialog.querySelector('.setup-fireball-wrap');

  var onSettingsWindowEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      hideSettingsWindow();
    }
  };

  var showSettingsWindow = function () {
    window.playerSettings.dialog.setAttribute('tabindex', '1');
    window.playerSettings.dialog.classList.remove('hidden');
    window.playerSettings.dialog.focus();
    document.addEventListener('keydown', onSettingsWindowEscPress);
  };

  var hideSettingsWindow = function () {
    window.playerSettings.dialog.classList.add('hidden');
    window.playerSettings.dialog.setAttribute('style', startCoords);
    window.playerSettings.dialog.removeAttribute('tabindex');
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
    var fireballColor = window.СharactersParams.FIREBALL_COLORS[window.util.getRandomNumber(window.СharactersParams.FIREBALL_COLORS.length - 1)];
    var fireballHiddenInput = myCharacterFireball.querySelector('input[name = fireball-color]');

    myCharacterFireball.setAttribute('style', 'background-color:' + fireballColor);
    fireballHiddenInput.setAttribute('value', fireballColor);
  };

  var addCharacterCallback = function () {
    myCharacterCoat.addEventListener('click', onElementColorClick(myCharacterCoat, window.СharactersParams.COAT_COLORS, coatInput));
    myCharacterEyes.addEventListener('click', onElementColorClick(myCharacterEyes, window.СharactersParams.EYES_COLORS, eyesInput));
    myCharacterFireball.addEventListener('click', onFireballSetColor);
  };

  addCharacterCallback();
})();
