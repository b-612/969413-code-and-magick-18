'use strict';
(function () {
  var dialogHandler = window.playerSettings.dialog.querySelector('.upload');

  var onClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    dialogHandler.removeEventListener('click', onClickPreventDefault);
  };

  var onMouseMove = function (isDragged, startCoordinates) {
    return function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.playerSettings.dialog.setAttribute('style', 'top: '
        + (window.playerSettings.dialog.offsetTop - shift.y) + 'px; ' +
        'left: ' + (window.playerSettings.dialog.offsetLeft - shift.x) + 'px');

      return isDragged;
    };
  };

  var onMouseUp = function (moveResult) {
    return function (upEvt) {
      // debugger;
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
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

    document.addEventListener('mousemove', onMouseMove(dragged, startCoords));
    document.addEventListener('mouseup', onMouseUp(onMouseMove));
  };

  dialogHandler.addEventListener('mousedown', onMouseDown);
})();
