'use strict';
(function () {
  var dialogHandler = window.playerSettings.dialog.querySelector('.upload');

  var onClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    dialogHandler.removeEventListener('click', onClickPreventDefault);
  };

  var onMouseUp = function (moveResult) {
    return function (upEvt) {
      // debugger;
      upEvt.preventDefault();

      document.removeEventListener('mousemove', moveResult);
      document.removeEventListener('mouseup', onMouseUp);

      if (moveResult) {
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.playerSettings.dialog.setAttribute('style', 'top: '
        + (window.playerSettings.dialog.offsetTop - shift.y) + 'px; ' +
        'left: ' + (window.playerSettings.dialog.offsetLeft - shift.x) + 'px');

      return dragged;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp(onMouseMove));
  };

  dialogHandler.addEventListener('mousedown', onMouseDown);
})();
