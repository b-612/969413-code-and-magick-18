'use strict';

(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    getRandomNumber: function (maxNumber) {
      return Math.floor(Math.random() * (maxNumber + 1));
    }
  };
})();
