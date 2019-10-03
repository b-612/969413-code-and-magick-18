'use strict';
(function () {
  var dialog = window.setup.dialog.querySelector('.upload');

  var onClickPreventDefault = function (clickEvt) {
    clickEvt.preventDefault();
    dialog.removeEventListener('click', onClickPreventDefault);
  };

  var onMouseUp = function (moveResult) {
    return function (upEvt) {
      // debugger;
      upEvt.preventDefault();

      document.removeEventListener('mousemove', moveResult);
      document.removeEventListener('mouseup', onMouseUp);

      if (moveResult) {
        dialog.addEventListener('click', onClickPreventDefault);
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

      window.setup.dialog.setAttribute('style', 'top: '
        + (window.setup.dialog.offsetTop - shift.y) + 'px; ' +
        'left: ' + (window.setup.dialog.offsetLeft - shift.x) + 'px');

      return dragged;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp(onMouseMove));
  };

  dialog.addEventListener('mousedown', onMouseDown);
})();
