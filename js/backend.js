'use strict';

(function () {
  var form = document.querySelector('.setup-wizard-form');

  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var LOAD_METHOD = 'GET';
  var LOAD_DATA = null;

  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick/';
  var UPLOAD_METHOD = 'POST';
  var REQUEST_TIMEOUT = 15000;

  var STATUS_OK = 200;

  var getXhr = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    return xhr;
  };

  var setXhrParams = function (xhr, url, method, timeout, data) {
    xhr.timeout = timeout;
    xhr.open(method, url);

    switch (data) {
      case null :
        xhr.send();
        break;
      default :
        xhr.send(data);
        break;
    }
  };

  var onCharactersLoad = function (xhrParam) {
    window.charactersParams.addSimilarCharacters(window.util.shuffleArray(xhrParam.response));
  };

  var getErrorMessage = function (xhr) {
    var errorPrew = 'Ошибка: ';
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
      default :
        errorMessage = 'Что-то пошло не так';
    }

    return {
      errorPrew: errorPrew,
      message: errorPrew + errorMessage + '. ' + errorStatus
    };
  };

  var onCharactersError = function (message) {
    var errorBlock = document.createElement('div');
    var setupFooter = form.querySelector('.setup-footer');

    errorBlock.setAttribute('style', 'font-size: 24px; color: #ffffff; ' +
      'background-color: #bf1a1a; ' +
      'padding: 30px 40px');

    errorBlock.textContent = message;
    setupFooter.insertAdjacentElement('afterbegin', errorBlock);
  };

  var getAdditionalErrors = function (xhr) {
    xhr.addEventListener('error', function () {
      onCharactersError(getErrorMessage(xhr).errorPrew + 'Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onCharactersError(getErrorMessage(xhr).errorPrew + 'Запрос не успел выполниться за ' + xhr.timeout + ' миллисекунд.');
    });
  };

  var setLoadCallback = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr);
        var similarWizads = xhr.response;
        window.backend.characters = similarWizads.slice();
      } else {
        onError(getErrorMessage(xhr).message);
      }
    });
  };

  var onButtonSubmit = function () {
    window.setup.dialog.classList.add('hidden');
  };

  var setFormCallback = function () {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      loadUploadCharacters(URL_UPLOAD, onButtonSubmit, onCharactersError, UPLOAD_METHOD, REQUEST_TIMEOUT, new FormData(form));
    });
  };

  var loadUploadCharacters = function (url, onLoad, onError, method, timeout, data) {
    var xhr = getXhr();

    setLoadCallback(xhr, onLoad, onError);

    getAdditionalErrors(xhr);
    setXhrParams(xhr, url, method, timeout, data);

  };

  window.backend = {
    load: loadUploadCharacters(URL_LOAD, onCharactersLoad, onCharactersError, LOAD_METHOD, REQUEST_TIMEOUT, LOAD_DATA),
    upload: setFormCallback()
  };
})();
