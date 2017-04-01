'use strict';

var bottomY = 250;
var cloudTopX = 100;
var cloudTopY = 10;
var cloudHeght = 270;
var cloudWidth = 420;
var histogramHeight = 150;
var histWidth = 40;
var indent = 50;
var barStep = indent + histWidth;
var colorBase = '#fff';
var colorShadow = 'rgba(0, 0, 0, 0.7)';

// Прорисовка облака (координаты облака, цвет облака)
var drawBox = function (ctx, cloudX, cloudY, cloudColor) {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeght);
};

// Поиск максимального значения в массиве (массив)
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

// Вычисление цвета для колонки
var getColor = function () {
  return 'rgba(11, 18, 110, ' + Math.random() + ')';
};

// Построение гистограммы (канвас, имена игроков, результаты)
var renderHisto = function (ctx, names, times) {
  var max = getMaxOfArray(times);
  var step = histogramHeight / max;
  max = (max / 1000).toFixed(2);

  for (var i = 0; i < names.length; i++) {
    var positionY = bottomY - times[i] * step;
    var positionHeight = bottomY - positionY;
    var histColor = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getColor();
    var positionX = 140 + barStep * i;
    var timeSet = Math.round(times[i]);
    ctx.strokeText(timeSet, positionX, positionY - 10);
    ctx.fillStyle = histColor;
    ctx.fillRect(positionX, positionY, histWidth, positionHeight);
    ctx.strokeText(names[i], positionX, cloudHeght);
  }
};

// Вывод игровой статистики (канвас, имена игроков, результаты)
window.renderStatistics = function (ctx, names, times) {
  drawBox(ctx, 110, 20, colorShadow);
  drawBox(ctx, cloudTopX, cloudTopY, colorBase);
  ctx.font = '16px PT Mono';
  ctx.strokeText('Ура, вы победили!', 140, 40);
  ctx.strokeText('Список результатов:', 140, 60);
  renderHisto(ctx, names, times);
};

