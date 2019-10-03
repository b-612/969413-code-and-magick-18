'use strict';

(function () {
  var dialogHandler = window.playerSettings.querySelector('.upload');

  var onClickPreventDefault = function (evt) {
    evt.preventDefault();
    dialogHandler.removeEventListener('click', onClickPreventDefault);
  };

  var onMouseMove = function (isDragged, startCoords) {
    return function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.playerSettings.setAttribute('style', 'top: ' +
        (window.playerSettings.offsetTop - shift.y) +
        'px; left: ' + (window.playerSettings.offsetLeft - shift.x) + 'px');
    };
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // if (isDragged) {
    //   onClickPreventDefault();
    // }
    // dialogHandler.addEventListener('click', onClickPreventDefault);
  };

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;
    document.addEventListener('mousemove', onMouseMove(dragged, startCoords));
    // debugger;
    document.addEventListener('mouseup', onMouseUp);
  });

})();
