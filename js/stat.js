'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADOW_X = CLOUD_X - 10;
var SHADOW_Y = CLOUD_Y - 10;
var TITLE_INDENT_TOP = 10;
var COLUMN_WIDTH = 40;
var COLUMN_MAX_HEIGHT = 150;
var COLUMN_X = CLOUD_X + 60;
var COLUMN_Y = CLOUD_Y + 75;
var COLUMN_INDENT_LEFT = 40;
var TEXT_INDENT_LEFT = 20;
var TEXT_INDENT_BOTTOM = 10;
var TEXT_INDENT_TOP = 20;
var TITLE_INDENT_TOP_2 = 40;

var renderCloud = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(SHADOW_X, SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + TITLE_INDENT_TOP);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + TITLE_INDENT_TOP_2);
};

var getMaxResult = function (times) {
  var maxResult = 0;
  for (var i = 0; i < times.length; i++) {
    if (Math.floor(times[i]) > maxResult) {
      maxResult = Math.floor(times[i]);
    }
  }
  return maxResult;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);
  var columnMaxHeight = getMaxResult(times);

  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText(Math.floor(times[i]), COLUMN_X + (COLUMN_WIDTH * i) + (COLUMN_INDENT_LEFT * i) + TEXT_INDENT_LEFT, COLUMN_Y - TEXT_INDENT_BOTTOM);

    var columnHeight = Math.floor((COLUMN_MAX_HEIGHT * Math.floor(times[i])) / columnMaxHeight);
    if (names[i] !== 'Вы') {
      ctx.fillStyle = 'hsl(210, ' + Math.floor(Math.random() * 101) + '%, 50%)';
    } else {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(COLUMN_X + (COLUMN_WIDTH * i) + (COLUMN_INDENT_LEFT * i), COLUMN_Y + (COLUMN_MAX_HEIGHT - columnHeight), COLUMN_WIDTH, columnHeight);

    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText(names[i], COLUMN_X + (COLUMN_WIDTH * i) + (COLUMN_INDENT_LEFT * i) + TEXT_INDENT_LEFT, COLUMN_Y + COLUMN_MAX_HEIGHT + TEXT_INDENT_TOP);
  }
};
