'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = window.setup.dialog.querySelector('input[type=file]');
  var preview = window.setup.dialog.querySelector('.setup-user-pic');

  var setAvatarCallback = function () {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];

      if (file) {
        var fileName = file.name.toLowerCase();
        var isPicture = FILE_TYPES.some(function (currentEnd) {
          return fileName.endsWith(currentEnd);
        });

        if (isPicture) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            preview.src = reader.result;
          });

          reader.readAsDataURL(file);
        }
      }
    });
  };

  setAvatarCallback();
})();
