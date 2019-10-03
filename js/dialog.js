'use strict';
(function () {
  var dialogHandler = window.playerSettings.dialog.querySelector('.upload');

  var onClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    dialogHandler.removeEventListener('click', onClickPreventDefault);
  };

  var onMouseMove = function (isDragged, coords) {
    return function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: coords.x - moveEvt.clientX,
        y: coords.y - moveEvt.clientY
      };

      coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.playerSettings.dialog.setAttribute('style', 'top: '
        + (window.playerSettings.dialog.offsetTop - shift.y) + 'px; ' +
        'left: ' + (window.playerSettings.dialog.offsetLeft - shift.x) + 'px');

      return isDragged;
    };
  };

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseUp = function (isDragged) {
      return function (upEvt) {
        // debugger;
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (isDragged) {
          dialogHandler.addEventListener('click', onClickPreventDefault);
        }
      };
    };

    document.addEventListener('mousemove', onMouseMove(dragged, startCoords));
    document.addEventListener('mouseup', onMouseUp(true));
  });
})();
