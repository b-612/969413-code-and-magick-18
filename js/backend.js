'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';

  var onCharactersLoad = function (xhrParam) {
    window.charactersParams.addSimilarCharacters(window.util.shuffleArray(xhrParam.response));
  };

  var onCharactersError = function (message) {
    var errorBlock = document.createElement('div');
    var setupForm = document.querySelector('.setup-wizard-form');
    var setupFooter = setupForm.querySelector('.setup-footer');

    errorBlock.setAttribute('style', 'font-size: 24px; color: #ffffff; ' +
      'background-color: #bf1a1a; ' +
      'padding: 30px 40px');

    errorBlock.textContent = message;
    setupFooter.insertAdjacentElement('afterbegin', errorBlock);
  };

  var loadWizards = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var errorPrew = 'Похожие персонажи не загрузились. Ошибка: ';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr);
      } else {
        var errorStatus = 'Статус ошибки: ' + xhr.status;
        var errorMessage;

        switch (xhr.status) {
          case 400 :
            errorMessage = 'Неверный запрос';
            break;
          case 401 :
            errorMessage = 'Пользователь не авторизован';
            break;
          case 404 :
            errorMessage = 'Ничего не найдено';
            break;
        }

        var error = errorPrew + errorMessage + '. ' + errorStatus;

        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onCharactersError(errorPrew + 'Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onCharactersError(errorPrew + 'Запрос не успел выполнится за ' + xhr.timeout + ' миллисекунд.');
    });

    xhr.timeout = 15000;
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: loadWizards(onCharactersLoad, onCharactersError)
  };
})();
